import React from 'react';

export enum ViewState {
  HOME = 'HOME',
  ARTICLE = 'ARTICLE',
  ADMIN = 'ADMIN',
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  summary?: string;
  content: string;
  imageUrl?: string;
}

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export const PRE_DEFINED_QUESTIONS = [
  "Quelles sont les étapes d'une succession ?",
  "Vente immobilière : quels documents préparer ?",
  "Quels sont les avantages du contrat de mariage ?",
  "Comment transmettre mon patrimoine de mon vivant ?"
];