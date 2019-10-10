import react, { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '~/components/Layout';
import Logo from '~/components/Logo';
import createApi from '~/lib/createApi';
import hostFromReq from '~/lib/hostFromReq';
import useInternetStatus from '~/lib/useInternetStatus';

function AdminHome({ host, requests }) {
  return (
    <Layout>
      <header>
        <Logo />
      </header>

      <h1>Albums</h1>

      <ul>
        {requests.map(request => (
          <li key={request.id}>
            <Link href={request.uri}>
              <a>
                <h2>{request.title}</h2>
              </a>
            </Link>
            <div className="album-id">{request.id}</div>
            <div>
              {request.media.map(item => (
                <img src={`${item.url}-/scale_crop/150x150/center/`} />
              ))}
            </div>
          </li>
        ))}
      </ul>

      <style jsx>{`
        header {
          margin: 50px 0;
        }

        ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        li {
          margin: 0 0 15px 0;
          padding: 10px;
          text-align: left;
          border-radius: 4px;
          box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.35);
        }

        li a {
          text-decoration: none;
        }

        li h2 {
          margin: 0 0 5px 0;
          color: #000;
        }

        li .album-id {
          margin: 0 0 5px 0;
          font-size: 12px;
          color: #aaa;
        }

        li img {
          margin: 0 5px 5px 0;
          width: 75px;
          border-radius: 4px;
        }
      `}</style>
    </Layout>
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
