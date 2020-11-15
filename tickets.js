const fetch = require('node-fetch');
require('dotenv').config();

const getTicketsByTag = async labelId => {
  console.log(labelId)
  return fetch(`https://api.clubhouse.io/api/v3/stories/search`, {
    method: 'post',
    body: JSON.stringify({
      archived: false,
      project_id: 15679, 
      label_ids: [labelId, ],
    }),
    headers: {
      'Content-Type': 'application/json',
      'Clubhouse-Token': process.env.CLUBHOUSE_TOKEN
    }
  }).catch(x => console.error(x.body))
  .then(res => res.json())
  .then(data => data.filter(datum => datum.workflow_state_id !== 500005660));  
}

const getTicketCount = async () => {
  console.log("Firing up.")
  let p0bugs = await getTicketsByTag(15201);
  let p1bugs = await getTicketsByTag(15200);
  let p2bugs = await getTicketsByTag(15199);
  let p3bugs = await getTicketsByTag(15198);
  
  console.log(p0bugs, p1bugs, p2bugs, p3bugs);

  return await {
    "blocks": [
      {
    		"type": "section",
    		"text": {
    			"type": "mrkdwn",
    			"text": `• \`${p0bugs.length}\` P0 bugs open\n• \`${p1bugs.length}\` P1 bugs open\n• \`${p2bugs.length}\` P2 bugs open\n• \`${p3bugs.length}\` P3 bugs open`
    		}
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `<https://app.clubhouse.io/gatsbyjs/stories/space/17007/b-d-cs-only|:standup-clubhouse: View Board>`
        }
      }
    ]
  }
}

module.exports = getTicketCount;