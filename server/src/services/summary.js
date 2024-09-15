const {extractContent} = require("./extractContent")

async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
		{
			headers: {
				Authorization: "Bearer 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",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({inputs: data}),
		}
	);
	const result = await response.json();
	return result;
}

async function summarizeFile(file) {
    try {
        const fileContent = await extractContent(file);

        const summaryResponse = await query(fileContent);

        const summaryText = summaryResponse[0]?.summary_text || "Summary not available";

        if (!summaryText) {
            throw new Error("No summary text received from the API.");
        }

        return { fileContent, summaryText };
    } catch (err) {
        throw new Error(err);
    }
}


module.exports = {summarizeFile};