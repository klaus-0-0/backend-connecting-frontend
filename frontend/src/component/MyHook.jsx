//            this is how you use your custom hook anywhere in your code clean and simple way


import CustomHooks from '../component/CustomHooks';

const MyHook = () => {
  const { data, loading, error } = CustomHooks('/api/items');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default MyHook;
