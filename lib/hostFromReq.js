const hostFromReq = (req) => {
  const hostname = req ? req.headers.host : window.location.hostname;
  const protocol = hostname.includes('localhost') ? 'http:' : 'https:';
  const host = `${protocol}//${hostname}`;
  return host;
};

export default hostFromReq;
