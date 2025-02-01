import React, { useContext, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {useNavigate} from 'react-router-dom'
import { LoginSchema } from "../schemas/";
import { useForm } from "react-hook-form"; 
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import AuthContext from "../contexts/authContext";

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { login , user} = useContext(AuthContext);
  const navigate = useNavigate()
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit =  (values) => {
    startTransition(async () => {
      
        await login(values).then((data) => {
            console.log('data',data)
          setError(data?.error);
          setSuccess(data?.success);
          if(data?.success){
            navigate('/')
          }
        });
      });
  };

  return (
    <div className="bg-gray-50 p-2 rounded-lg shadow-md max-w-md mx-auto">
      <Form {...form}>
  
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your email"
                      type="email"
                      className="border-gray-300"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="••••••••"
                      type="password"
                      className="border-gray-300"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />

          <div className="mt-6">
            <Button
              type="submit"
              className="w-full hover:bg-blue-700"
              disabled={isPending}
            >
              Login
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
