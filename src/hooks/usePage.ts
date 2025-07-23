import { usePageStore } from '@/stores/pageStore';

export const usePage = () => {
  const { title, description, setTitle, setDescription, setPage } =
    usePageStore();

  return {
    title,
    description,
    setTitle,
    setDescription,
    setPage,
  };
};
