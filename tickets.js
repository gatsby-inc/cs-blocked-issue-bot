const fetch = require('node-fetch');
const moment = require('moment');
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

const getOldestTicket = async (tickets, unit) => {
  if (tickets.length < 1) return null;
  let oldestTicket = await tickets.sort((ticket1, ticket2) => Date(ticket2.created_at) - Date(ticket1.created_at)).slice(-1)[0];
  let diff = new Date() - new Date(oldestTicket.created_at);
  if (unit == 'days') {
    return Math.round(new moment.duration(diff).asDays(), 0);
  } else if (unit ='hours') {
    return Math.round(new moment.duration(diff).asHours(), 0);
  }
}

const getTicketCount = async () => {
  let p1bugs = await getTicketsByTag(15200);
  let p2bugs = await getTicketsByTag(15199);
  let p3bugs = await getTicketsByTag(15198);
  let p4bugs = await getTicketsByTag(16661);

  let p1age = await getOldestTicket(p1bugs, 'hours');
  let p2age = await getOldestTicket(p2bugs, 'days');
  let p3age = await getOldestTicket(p3bugs, 'days');
  let p4age = await getOldestTicket(p4bugs, 'days');

  return await {
    "blocks": [
      {
    		"type": "section",
    		"text": {
    			"type": "mrkdwn",
          "text": `• \`${p1bugs.length}\` P1 bugs open${ p1age ? ` | The oldest is ${p1age} hours old. Must resolve ASAP` : ``}\n• \`${p2bugs.length}\` P2 bugs open${ p2age ? ` | The oldest is ${p2age} days old. (max 14 days) ` : ``}\n• \`${p3bugs.length}\` P3 bugs open${ p3age ? ` | The oldest is ${p3age} days old (max 24 days)` : ``}\n• \`${p4bugs.length}\` P4 bugs open${ p4age ? ` | The oldest is ${p4age} days old (no max)` : ``}`
    		}
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `:point_right: <https://app.clubhouse.io/gatsbyjs/stories/space/17007/b-d-cs-only|:standup-clubhouse: View Board>`
        }
      }
    ]
  }
}

module.exports = getTicketCount;