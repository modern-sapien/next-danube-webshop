# playwright-in-production-webinar
We want to create a knowledgebase for locally hosted AI, so that when we have questions about the functionality for the solutions we care the most about we're referencing the most up to date information possible.

### Pre-work
Install Playwright
Install Ollama or HuggingFace
Install locally hosted LLM

Create method for chatting w/ locally hosted LLM

Let's npm install interintel and keep going from there

### 1. Simple data extraction
We setup playwright/test and look at Checklyhq.com/docs. We want to know all of the constructs we can use for resources using the Constructs Reference part of the docs. 

* visit checklyhq.com/docs/something
* we find the page
* we get all of the content from the page
* we write to a text file
* let's chat?

What do we notice? 

It's a little rough and pretty long. It's gathering everything on the page, refining would be pretty painful. 

### 2. More defined data extraction
Let's do some handling on page elements within the Constructs Reference so that we can separate the constructs a bit better. Maybe it's useful for us to have a glossary of constructs to help with AI searching the text file for what's available to reference? 

* visit checklyhq.com/docs
* we find the construct reference page
* from <heading class='heading anchor' href="#project"> 
** href URL = the name of the construct
** create list of constructs
** create contruct specific summary & construct example
** we write each to a text file
* let's chat?

What do we notice? There's no fluff, we have markdown that is easy to understand for both us and AI. 

### 3. CSVs, embeddings, scheduling
Okay, great our knowledge base is growing. We want to look at additional tools like
