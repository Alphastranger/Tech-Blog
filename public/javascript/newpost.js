const submission = document.querySelector('.postForm')
const submissionForm = async (event)=> {
    event.preventDefault();
    const title = document.querySelector('#title').value
    const post_text = document.querySelector('#post').value
    if (title && post_text) {
        const response = await fetch('/', {
            method:'POST',
            body: JSON.stringify({title, post_text}),
            headers: {'Content-Type': 'application/json'},
        })
        if (response.ok) {
            document.location.replace('/')
        }
    }
}

document.addEventListener('submit', submissionForm)