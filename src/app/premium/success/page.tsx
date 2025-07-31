import Image from "next/image";
import { Button } from '@/components/ui/button';

export default function SuccessPage() {
  return (
    <div className="-mb-4 h-screen flex flex-col items-center justify-center">
      <Image src="/og-image.png" alt="success image" width={400} height={400} />
      <h3 className="text-2xl mt-8 text-center">thank you for purchasing <br /> aurabank subscription!</h3>
    </div>
  );
}
