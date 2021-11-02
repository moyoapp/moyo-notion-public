import React from 'react';
import Head from 'next/head';

import { getPageTitle, getAllPagesInSpace } from 'notion-utils';
import { NotionAPI } from 'notion-client';
import { Collection, CollectionRow, NotionRenderer } from 'react-notion-x';
import { GetStaticPropsContext } from 'next';
import { ExtendedRecordMap } from 'notion-types';

const isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;

const notion = new NotionAPI();

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const pageId = context.params?.pageId as string;
  const recordMap = await notion.getPage(pageId);

  return {
    props: {
      recordMap,
    },
    revalidate: 10,
  };
};

export async function getStaticPaths() {
  if (isDev) {
    return {
      paths: [],
      fallback: true,
    };
  }

  const rootNotionPageId = 'moyo-0f854cb2e63d42e8b31c147bd9c2db2a';
  const rootNotionSpaceId = 'moyo-0f854cb2e63d42e8b31c147bd9c2db2a';

  // This crawls all public pages starting from the given root page in order
  // for next.js to pre-generate all pages via static site generation (SSG).
  // This is a useful optimization but not necessary; you could just as easily
  // set paths to an empty array to not pre-generate any pages at build time.
  const pages = await getAllPagesInSpace(
    rootNotionPageId,
    rootNotionSpaceId,
    notion.getPage.bind(notion),
    {
      traverseCollections: false,
    },
  );

  const paths = Object.keys(pages).map((pageId) => `/${pageId}`);

  return {
    paths,
    fallback: true,
  };
}

interface INotionPageProps {
  recordMap: ExtendedRecordMap;
}

export default function NotionPage({ recordMap }: INotionPageProps) {
  if (!recordMap) {
    return null;
  }

  const title = getPageTitle(recordMap);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <NotionRenderer
        recordMap={recordMap}
        fullPage={true}
        darkMode={false}
        rootDomain="localhost:3000" // used to detect root domain links and open this in the same tab
        components={{
          collection: Collection,
          collectionRow: CollectionRow,
        }}
      />
    </>
  );
}
