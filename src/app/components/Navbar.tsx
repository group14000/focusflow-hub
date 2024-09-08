"use client"

import { Search } from "lucide-react"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between p-4 bg-background border-b">
            <div className="flex items-center flex-1">
                <form className="hidden sm:block flex-1 max-w-sm">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="pl-8 w-full"
                        />
                    </div>
                </form>
            </div>
            <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="sm:hidden">
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Search</span>
                </Button>
                <SignedOut>
                    <SignInButton>
                        <Button variant="secondary">Sign In</Button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserButton/>
                </SignedIn>
            </div>
        </nav>
    )
}