import react, { useState } from 'react';
import Router from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '~/components/Logo';
import createApi from '~/lib/createApi';
import hostFromReq from '~/lib/hostFromReq';
import useInternetStatus from '~/lib/useInternetStatus';

function AdminHome({ host, requests }) {
  return (
    <>
      <header>
        <Logo />
      </header>

      <ul>
        {requests.map(request => (
          <li>
            <Link href={request.uri}>
              <a>{request.title}</a>
            </Link>
          </li>
        ))}
      </ul>

      <style jsx>{`
        header {
          margin: 50px 0;
        }
      `}</style>
    </>
  );
}

AdminHome.getInitialProps = async ({ req }) => {
  const host = hostFromReq(req);
  const api = createApi({ host });

  let requests;
  try {
    requests = await api.getRequests();
  } catch (error) {
    throw error;
  }
  return { host, requests };
};

export default AdminHome;
