import { HardHat, Loader2 } from 'lucide-react';

export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-yellow-50 text-gray-800">
      <HardHat className="w-16 h-16 text-yellow-600 animate-bounce" />
      <h1 className="text-2xl md:text-3xl font-bold mt-4 text-center">
        We are Building Something Great
      </h1>
      <p className="text-gray-600 mt-2">Please wait while we load your experience</p>
      <Loader2 className="w-6 h-6 mt-6 text-yellow-600 animate-spin" />
    </div>
  );
}
