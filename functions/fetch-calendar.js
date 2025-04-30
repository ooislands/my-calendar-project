const axios = require('axios');

exports.handler = async (event, context) => {
  // 요청 메소드 확인 - GET만 허용
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: '지원하지 않는 메소드입니다. GET 요청만 허용됩니다.' })
    };
  }

  try {
    // iCal URL
    const icalUrl = 'https://calendar.google.com/calendar/ical/86c1f91d4406d4f40b3bd35ebbcdc182a33843a3bd5fd7240f19636017ab9b3d%40group.calendar.google.com/public/basic.ics';
    
    // URL 파라미터에서 년도와 월 가져오기
    const { year, month } = event.queryStringParameters || {};
    
    // iCal 파일 가져오기
    const response = await axios.get(icalUrl);
    
    // CORS 헤더 설정 (모든 도메인 허용)
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'text/plain' // iCal 데이터를 text/plain으로 반환
      },
      body: response.data
    };
  } catch (error) {
    console.error('Error fetching calendar data:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        error: 'Calendar data fetch failed', 
        details: error.message 
      })
    };
  }
};
