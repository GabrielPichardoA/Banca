import LoginForm from '@/components/auth/LoginForm';
import Navbar from '@/components/Navbar';

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-12">
        <LoginForm />
      </div>
    </div>
  );
}
