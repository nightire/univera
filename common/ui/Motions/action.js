import fetch from 'fetch';

export const endpoint = 'http://api.football-data.org/v1';

export const opts = {
  headers: {
    'X-Response-Control': 'full',
    'X-Auth-Token': '6f71dbba537b44139bedc0edc89d8920',
  }
};

export const FETCH_ARSENAL_TEAM = '读取－阿森纳俱乐部';
export const fetchArsenalTeam = () => ({
  type: FETCH_ARSENAL_TEAM,
  payload: fetch(`${endpoint}/teams/57`, opts)
    .then(response => response.json())
});

export const FETCH_ARSENAL_PLAYERS = '获取－阿森纳运动员';
export const fetchArsenalPlayers = () => ({
  type: FETCH_ARSENAL_PLAYERS,
  payload: fetch(`${endpoint}/teams/57/players`, opts)
    .then(response => response.json())
});
