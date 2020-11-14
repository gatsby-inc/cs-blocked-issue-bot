import fetch from 'node-fetch';

export default (data) => {
  console.log(data);
  return fetch(process.env.SLACK_WEBHOOK, { 
    method: 'POST', 
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => console.log(res.status)); 
};