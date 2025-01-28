"use client";
import Image from 'next/image';
import Form from './Form';

function Login() {
  return (

    <main className="py-5 md:px-9">
      <div className="container relative py-5">
        <div className="mb-6 flex justify-center">
          <Image
            src={"/assets/logo.png"}
            width={95}
            height={159}
            alt="logoa"
          />
        </div>

        <div className="max-w-xl mx-auto shadow-xl px-11 py-5 bg-white rounded-md">
          <Form />
        </div>

      </div>
    </main>
  );
}

export default Login;
