// 'use client';
import React from 'react';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
import NavigationBar from '../components/Server/NavigationBar/NavigationBar';
import QuestionsTable from '../components/Questions/QuestionsTable';

export interface Question {
  id: number | string;
  title: string;
  difficulty: string;
  categories: string[];
  description: string;
  question_link: string;
  solution_link: string;
}

async function getTickets(): Promise<Question[]> {
  const res: Response = await fetch('http://localhost:8001/questions', {
    method: 'GET',
    headers: { token: localStorage.token },
    cache: 'no-store',
  });
  const questions: Question[] = await res.json();
  return questions;
}

const QuestionsPage = async () => {
  // const router = useRouter();
  // useEffect(() => {
  //   const isAuthenticated = localStorage.getItem('role');

  //   if (!isAuthenticated || isAuthenticated !== 'maintainer') {
  //     router.push('/');
  //   }
  // }, []);

  // const questions: any = await getTickets();

  return (
    <section className="text-white p-4">
      <NavigationBar isAuthenticated={true} />
      <div className="container mx-auto flex md:flex-row flex-col">
        <QuestionsTable />
      </div>
    </section>
  );
};

export default QuestionsPage;
