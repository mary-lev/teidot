import React, { useState, useContext } from 'react';
import Markdown from 'react-markdown';

import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { python } from '@codemirror/lang-python';

import { executeCode } from '../utils';
import SessionTokenContext from '../contexts/SessionTokenContext';
import { useStepStatus } from '../contexts/StepStatusContext';


import {
  Flex,
  Box,
  Card,
  CardBody,
  Text,
  Textarea,
  Spinner,
  Button,
  useMediaQuery
} from '@chakra-ui/react';

const CodeExample = ({ taskName }) => {
  const current_task = data.tasks[taskName];
  const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');
  const [code, setCode] = useState(current_task.code);
  const [output, setOutput] = useState(current_task.output_default);
  const sessionToken = useContext(SessionTokenContext);
  const { markStepCompleted } = useStepStatus();
  const [textareaValue, setTextareaValue] = useState("");
  const [thanks, setThanks] = useState(false);
  const [hintRequested, setHintRequested] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCodeChange = (value, viewUpdate) => {
    setCode(value); // Update the code state with the new value
  };

  const handleInputChange = (event) => {
    setTextareaValue(event.target.value);
  };

  const handleRequestHint = () => {
    setHintRequested(true); // Indicate that the hint was requested
  };

  const handleAdditionalQuestion = () => {
    setThanks("Great! We're on it and will review your response shortly."); // Indicate that the hint was requested
    // requestFeedback(textareaValue);
  };

  const requestFeedback = async (output, additional) => {
    const payload = {
      code: code,
      task_name: current_task.slug,
      output: output,
    };
    console.log("Payload for feedback:", payload);
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/code/help`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${sessionToken}`,
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json(); // Parse the JSON data from the response
    console.log("Feedback from server:", data);
    if (response.ok) {
      setFeedback(data.feedback);
      setIsLoading(false);
    }
    if (data.success) {
      setFeedback(data.feedback);
      markStepCompleted(current_task.id);
    }
  }

  const submitForm = async () => {
    setHintRequested(false);
    setFeedback("");
    setIsLoading(true); // Assume loading starts here

    // Check if the code is the same as the default before executing it
    if (code === current_task.code) {
      console.log("Code is the same as the default");
      setFeedback(data.texts.using_default_code);
      setIsLoading(false); // Stop loading since we're not executing the code
    } else {
      try {
        const response = await executeCode(code, sessionToken, current_task.slug); // Execute the code
        console.log("Response from server:", response);
        setOutput(response.output);

        if (current_task.answer && (response.output === current_task.answer)) {
          // If we know that the result is correct
          console.log("Correct answer!");
          setFeedback(current_task.correct_answer); // Assuming you have a correct answer text
          markStepCompleted(current_task.id);
        } else {
          // If the answer is wrong
          requestFeedback(response.output); // Request feedback for the wrong answer
        }

      } catch (error) {
        console.error("Error executing code:", error);
        requestFeedback(); // Request feedback in case of an error
      } finally {
        // setIsLoading(false); // Stop loading after execution and handling
      }
    }
  };


  return (
    <Flex
      w="full"
      minHeight="90vh"
      py="16"
      px={isLargerThanLG ? '16' : '6'}
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      bg="white.100"
    >
      <Text fontSize="3xl" mb="6">
        {current_task.name}
      </Text>
      <Text as="div"
        mb="6"
        fontSize="lg"
        opacity={0.7}
        w={isLargerThanLG ? '60%' : 'full'}
      >
        <Markdown>{current_task.text}</Markdown>
      </Text>

      {/* Flex container for CodeMirror blocks */}

      <Flex justifyContent="space-around" w="70%">
        <Box flex="1" mr={2}>
          <CodeMirror
            value={current_task.code} // The initial code to display
            height="260px" // Editor height
            theme={vscodeDark} // Editor theme
            options={{
              lineNumbers: true,
              mode: 'python',
              indentUnit: 4,
              // smartIndent: true,
              // autoIndent: true,
              // hangingIndent: 4,
              // tabSize: 4,
              // indentOnInput: true,
            }}
            extensions={[python()]} // Load Python language support
            onChange={handleCodeChange} // Handle changes
          />

        </Box>
        <Box flex="1" ml={2}>
          <CodeMirror
            value={output}
            height="260px"
            theme={vscodeDark}
            options={{
              lineNumbers: true,
              lineWrapping: true,
              mode: 'python',
              readOnly: true,
              indentUnit: 4
            }}
            extensions={[python()]}
            editable={false}
          />
        </Box>
      </Flex>
      <Flex mt="4" justifyContent="start" gap="4">
        <Button
          colorScheme="blue"
          size="lg"
          textAlign="left"
          width="150px"
          type="submit"
          onClick={submitForm}
        >
          RUN
        </Button>

        <Button
          colorScheme="teal"
          size="lg"
          textAlign="left"
          width="150px"
          type="submit"
          onClick={handleRequestHint}
        >
          HELP?
        </Button>
        {/* )} */}
      </Flex>
      {
        hintRequested ? (
          <Box w="60%">
            <Card size='md' mt="6" style={{ border: '2px solid #007bff' }}>
              <CardBody>
                <Box>{current_task.hint}</Box>
              </CardBody>
            </Card>
          </Box>
        ) : null // or use <> </> for an empty fragment if you prefer
      }


      {feedback ? (
        <Box w="60%">
          <Card size='md' mt="6" style={{ border: '2px solid #007bff' }}>
            <CardBody>
              <Box><Markdown>{feedback}</Markdown></Box>
            </CardBody>
          </Card>
        </Box>
      ) : isLoading ? (
        <Box w="60%">
          <Card size='md' mt="6" style={{ border: '2px solid #007bff' }}>
            <CardBody>
            <Spinner />
            </CardBody>
          </Card>
        </Box>
      ) : null
      }

      {current_task.additional_question ? (
        <Box mt="8" w="60%">
          <Text mb='8px'>{current_task.additional_question}</Text>
          <Textarea
             value={textareaValue}
             onChange={handleInputChange}
             placeholder={current_task.placeholder}
            size='sm'
            editable="true"
          />
          <Box mt="6">
            <Button onClick={handleAdditionalQuestion} mb={4} textAlign="right">
              SUBMIT
            </Button></Box>
        </Box>

      ) : null}

      {thanks ? (
        <Box w="60%">
          <Card size='md' mt="6" style={{ border: '2px solid #007bff' }}>
            <CardBody>
              <Box>{thanks}</Box>
            </CardBody>
          </Card>
        </Box>
      ) : null}




    </Flex>
  );
};

export default CodeExample;