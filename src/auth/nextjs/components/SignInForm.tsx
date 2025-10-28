'use client'
import { InputField } from '@/components/form/InputField'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { signIn } from '../actions'
import { type SignInData, signInSchema } from '../schema'

export const SignInForm = () => {
  const [error, setError] = useState<string>()
  const { control, handleSubmit } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: SignInData) => {
    const errorMessage = await signIn(data)
    setError(errorMessage)
  }

  return (
    <Card>
      <CardHeader className='text-2xl font-semibold'>Sign In</CardHeader>
      <CardContent>
        {error && <p className='text-destructive'>{error}</p>}
        <form
          id='signin-form'
          className='flex flex-col gap-5'
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputField
            name='email'
            control={control}
            label='Email'
            type='email'
            required
          />
          <InputField
            name='password'
            control={control}
            label='Password'
            type='password'
            required
          />
        </form>
      </CardContent>
      <CardFooter>
        <Button type='submit' className='ml-auto' form='signin-form'>
          Sign in
        </Button>
      </CardFooter>
    </Card>
  )
}
