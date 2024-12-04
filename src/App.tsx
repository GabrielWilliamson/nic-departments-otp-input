import CustomerForm from "./components/CustomerForm";

// import CustomerForm from "@/components/CustomerForm";
function App() {
  return (
    <div className="flex h-screen flex-col items-center justify-center items-center">
      <h1 className="text-2xl font-bold">Add a new customer</h1>
      <CustomerForm />
    </div>
  );
}

export default App;
