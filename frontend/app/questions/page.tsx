// 'use client';
import React from 'react';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
import NavigationBar from '../components/Server/NavigationBar/NavigationBar';
import QuestionsTable from '../components/Questions/QuestionsTable';

export interface Question {
  id: number;
  title: string;
  difficulty: string;
  categories: string[];
  description: string;
  question_link: string;
  solution_link: string;
}

async function getTickets(): Promise<Question[]> {
  const res: Response = await fetch('http://localhost:8001/questions');
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

  const questions: any = await getTickets();

  return (
    <section className="text-white">
      <NavigationBar isAuthenticated={true} />
      <div className="container mx-auto flex md:flex-row flex-col">
        <QuestionsTable questions={questions['questions']} />
      </div>
    </section>
  );
};

export default QuestionsPage;
