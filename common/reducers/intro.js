export default (state = {
  title: `<h1>Leica Deals Survey</h1>`,
  content: `
    <p>Dear Leica fan,</p>
    <p>Thanks for helping us to improve Leica Deals!  We have 14
      questions, the survey shouldn't take more than 5 minutes to
      answer.</p>
    <p>Thanks in advance!</p>
    <p>Andreas</p>
  `
}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
