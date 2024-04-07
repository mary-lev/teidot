const executeCode = async (code, sessionToken, task_id) => {
    console.log(typeof code, code)
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/code/compile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${sessionToken}`,
            },
            body: JSON.stringify({
                code: code,
                task_name: task_id
            }),
        });
        console.log("Response from server:", response);
        const data = await response.json(); // Parse the JSON data from the response
        console.log("Data from server:", data);

        if (response.ok) {
            return data;
        }
    } catch (error) {
        console.error(error);
    }
};

export { executeCode };

const requestFeedback = async (code, task_name, sessionToken) => {
    const payload = {
      code: code,
      task_name: task_name,
    };
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/code/help`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${sessionToken}`,
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json(); // Parse the JSON data from the response
    if (response.ok) {
      return data.hint;
    } else {
      return null;
    }
  }

export { requestFeedback };