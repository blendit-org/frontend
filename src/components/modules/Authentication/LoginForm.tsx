import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Link, useNavigate } from "react-router"
import PasswordField from "./PasswordField"
import { useLoginMutation } from "@/redux/features/auth/auth.api"
import { toast } from "sonner"

const LoginSchema = z.object({
    email: z.email(),
    password: z.string().min(8,{message: "Password must have at least 8 characters"}).max(20,{message:"Password can not exceed 20 characters!"})
})

export function LoginForm({
  className,
}: React.ComponentProps<"form">) {

    const [login] = useLoginMutation();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password:""
        }
    })

    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        const userInfo = {
            email: values.email,
            password: values.password
        };

        try {
            const result = await login(userInfo).unwrap();
            console.log(result);
            toast.success("User logged in SUccessfully")
            navigate("/")
        } catch (error:any) {
            if (error.status === 401) {
                toast.error("Verify your account first!");
                navigate("/verify", {state: values.email})
            }
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your email & password below to Register Your Account!
                </p>
            </div>
            {/* Form  */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Your email" type="email"{...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Enter Your Password</FormLabel>
                                <FormControl>
                                    <PasswordField {...field} />
                                </FormControl>
                                <FormDescription>
                                    Keept it secret!
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                   <Button type="submit" className="w-full">Submit</Button>
                </form>
            </Form>
            <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link to={"/register"} className="underline underline-offset-4">
                    Register
                </Link>
            </div>
        </div>
    );
}

export default LoginForm;







