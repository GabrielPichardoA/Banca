import RegisterForm from '@/components/auth/RegisterForm';
import Navbar from '@/components/Navbar';

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-12">
        <RegisterForm />
      </div>
    </div>
  );
}
