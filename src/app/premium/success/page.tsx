import Image from "next/image";

export default function SuccessPage() {
  return (
    <div className="-mb-4 flex h-screen flex-col items-center justify-center">
      <Image src="/og-image.png" alt="success image" width={400} height={400} />
      <h3 className="mt-8 text-center text-2xl">
        thank you for purchasing <br /> aurabank subscription!
      </h3>
    </div>
  );
}
