import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import MainLayout from "@/components/MainLayout";
import useLocalStorage from "@/hooks/localstorage";
import { IUser, RegisterUser, User } from "@/types/user";
import { Form } from "@unform/web";
import { useRouter } from "next/router";
import { useRef } from "react";


export default function SignupPage() {
  const [localStorageUsers, setLocalStorageUsers] = useLocalStorage("users", [])
  const users: IUser[] = localStorageUsers.map((d: any) => new User(d))

  const [localStorageUser, setLocalStorageUser] = useLocalStorage("user", [])

  const formRef = useRef(null)
  const router = useRouter()

  const submit = (data: any) => {
    const swapUsers = users.filter(u => u.email == data.email)
    if (!swapUsers.length) {
      alert("Não existe")
      return
    }

    const user = swapUsers[0]

    if (!user.checkPassword(data.password)) {
      alert("Senha diferente")
      return
    }

    setLocalStorageUser(user)
    router.push("/dashboard")
  }

  return (
    <MainLayout>
      <div className="pb-10 w-full max-w-full px-3 mx-auto mt-0 text-center">
        <h1 className="mt-12 mb-2 text-white text-5xl font-bold">Cash Flow</h1>
        <p className="text-white text-base">
          Use o cash flow e matenha suas finanças em ordem
        </p>
      </div>

      <div className="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
        <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-xl rounded-2xl bg-clip-border">
          <div className="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl">
            <h5>Entre</h5>
          </div>
          <div className="flex-auto p-6">
            <Form ref={formRef} onSubmit={submit}>
              <div className="mb-4"><FormInput name="email" placeholder="Email" type="email" /></div>
              <div className="mb-4"><FormInput name="password" placeholder="Senha" type="password" /></div>

              <Button
                text="Entrar"
                customClassess="inline-block w-full px-5 py-2.5 mt-6 mb-2 font-bold text-center text-white align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:-translate-y-px hover:shadow-xs leading-normal text-sm ease-in tracking-tight-rem shadow-md bg-150 bg-x-25 bg-gradient-to-tl from-zinc-800 to-zinc-700 hover:border-slate-700 hover:bg-slate-700 hover:text-white"
              />
            </Form>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
