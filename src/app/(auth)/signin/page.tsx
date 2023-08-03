'use client';
import { signIn } from 'next-auth/react';

import { Button } from '~components/ui/Button';

export default function SignIn() {
  return (
    <div className="flex h-screen justify-center items-center bg-slate-700">
      <div className="w-[420px] mx-14 mb-14 bg-slate-50 shadow-lg rounded-xl overflow-hidden">
        <div className="flex justify-center px-4 py-6 bg-slate-200">
          <h6 className="text-xl font-bold">Регистрация</h6>
        </div>
        <div className="p-10 flex flex-col gap-4">
          <Button
            variant="contained"
            onClick={() => signIn('mailru', { callbackUrl: '/' })}
          >
            Зарегистрироваться через Mail.ru
          </Button>
        </div>
      </div>
    </div>
  );
}
