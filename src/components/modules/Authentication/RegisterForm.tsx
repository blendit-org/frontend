import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import PasswordField from "./PasswordField"
import { Link, useNavigate } from "react-router"
import { useRegisterMutation } from "@/redux/features/auth/auth.api"
import { toast } from "sonner"

const RegisterSchema = z.object({
    name: z.string().min(3).max(50),
    email: z.email(),
    password: z.string().min(8, { message: "Password must have at least 8 characters" }).max(20, { message: "Password can not exceed 20 characters!" }),
    confirmPassword: z.string().min(8, { message: "Password must have at least 8 characters" }).max(20, { message: "Password can not exceed 20 characters!" }),
}).refine((data) => data.password === data.confirmPassword,{
    message: "Password don't match",
    path:["confirmPassword"],
});

export function RegisterForm({
  className,
}: React.ComponentProps<"form">) {

    const [register] = useRegisterMutation();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name:""
        }
    })

    const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
        const userInfo = {
            name: values.name,
            email: values.email,
            password: values.password
        };

        try {
            const result = await register(userInfo).unwrap();
            console.log(result);
            toast.success("User Created SUccessfully");
            navigate("/verify")
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Register</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your Information below to Register Your Account!
                </p>
            </div>
            {/* Form  */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
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
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter You Email" type="email" {...field} />
                                </FormControl>
                                <FormDescription>
                                    
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
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <PasswordField {...field} />
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                        
                    />
                     <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <PasswordField {...field} />
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                        
                    />
                   <Button type="submit" className="w-full">Submit</Button>
                </form>
            </Form>
            <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to={"/login"} className="underline underline-offset-4">
                    Login
                </Link>
            </div>
        </div>
    );
}

export default RegisterForm;







