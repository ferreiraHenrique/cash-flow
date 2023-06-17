import Button from "@/components/Button";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { getProviders, signIn } from "next-auth/react";


export default function SigninPage(
  { providers }: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <>
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
          {Object.values(providers).map(p => (
            <div key={p.id} className="flex-auto p-6 pt-0 text-center">
              <Button
                text={`Entre com ${p.name}`}
                onClick={() => {
                  signIn(p.id)
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    return { redirect: { destination: "/loading" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  }
}
