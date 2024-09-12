'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Home,
    CheckSquare,
    Repeat,
    Target,
    Calendar,
    BarChart2,
    Link as LucideLink,
    Bell,
    HelpCircle,
    ChevronDown,
    Menu,
} from 'lucide-react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs"
import Link from 'next/link'

interface MenuItem {
    label: string;
    icon: React.ComponentType<any>;
    href?: string;
    subItems?: { label: string; href: string }[];
}

const menuItems: MenuItem[] = [
    { label: 'Home', icon: Home, href: '/' },
    {
        label: 'Tasks',
        icon: CheckSquare,
        subItems: [
            { label: 'View All Tasks', href: '/tasks' },
            { label: 'Add New Task', href: '/tasks/new' },
            { label: 'Task Categories', href: '/tasks/categories' },
        ],
    },
    { label: 'Habits', icon: Repeat, href: '/habits' },
    {
        label: 'Goals',
        icon: Target,
        subItems: [
            { label: 'View All Goals', href: '/goals' },
            { label: 'Add New Goal', href: '/goals/new' },
        ],
    },
    { label: 'Calendar', icon: Calendar, href: '/calendar' },
    { label: 'Reports', icon: BarChart2, href: '/reports' },
    {
        label: 'Integrations',
        icon: LucideLink,
        subItems: [
            { label: 'Google Calendar Sync', href: '/integrations/google-calendar' },
            { label: 'Notion Integration', href: '/integrations/notion' },
        ],
    },
    { label: 'Notifications', icon: Bell, href: '/notifications' },
    { label: 'Help', icon: HelpCircle, href: '/help' },
]

function MenuItem({ item, isOpen }: { item: MenuItem; isOpen: boolean }) {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
            <CollapsibleTrigger asChild>
                {item.href ? (
                    <Link href={item.href} className={`w-full flex items-center text-gray-700 hover:bg-gray-100 transition-all ${isOpen ? 'p-2' : 'p-2 md:px-4'}`}>
                        <item.icon className={`h-5 w-5 ${isOpen ? 'mr-2' : ''}`} />
                        {isOpen && <span>{item.label}</span>}
                    </Link>
                ) : (
                    <Button variant="ghost" className={`w-full justify-start text-gray-700 hover:bg-gray-100 ${isOpen ? 'p-2' : 'p-2 md:px-4'}`}>
                        <item.icon className={`h-5 w-5 ${isOpen ? 'mr-2' : ''}`} />
                        {isOpen && (
                            <>
                                <span>{item.label}</span>
                                {item.subItems && (
                                    <ChevronDown
                                        className={`ml-auto h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                                    />
                                )}
                            </>
                        )}
                    </Button>
                )}
            </CollapsibleTrigger>
            {item.subItems && isOpen && (
                <CollapsibleContent className="pl-9 space-y-1">
                    {item.subItems.map((subItem) => (
                        <Link key={subItem.label} href={subItem.href} className="w-full flex justify-start text-gray-600 hover:bg-gray-50 transition-all p-2">
                            {subItem.label}
                        </Link>
                    ))}
                </CollapsibleContent>
            )}
        </Collapsible>
    )
}

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true)
    const { user } = useUser()

    return (
        <>
            {/* Sidebar for larger screens */}
            <aside className={`hidden md:flex h-screen ${isOpen ? 'w-64' : 'w-16'} flex-col border-r bg-white shadow-sm transition-all duration-300`}>
                <div className="flex h-14 w-full items-center justify-between px-4">
                    {isOpen && <h1 className="text-lg font-semibold">Dashboard</h1>}
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>
                <ScrollArea className="flex-1 w-full">
                    <div className="space-y-2 p-2">
                        {menuItems.map((item) => (
                            <MenuItem key={item.label} item={item} isOpen={isOpen} />
                        ))}
                        <div className="mt-4 px-2 flex items-center">
                            <SignedOut>
                                <SignInButton />
                            </SignedOut>
                            <SignedIn>
                                <Button className="w-full flex items-center space-x-2">
                                    <UserButton />
                                    {isOpen && <span>{user?.firstName}</span>}
                                </Button>
                            </SignedIn>
                        </div>
                    </div>
                </ScrollArea>
            </aside>

            {/* Sidebar for mobile screens */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="md:hidden fixed top-4 left-4 z-40">
                        <Menu className="h-5 w-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0 bg-white shadow-lg">
                    <SheetHeader className="h-14 px-4">
                        <SheetTitle>Dashboard</SheetTitle>
                    </SheetHeader>
                    <ScrollArea className="h-[calc(100vh-3.5rem)]">
                        <div className="space-y-2 p-2">
                            {menuItems.map((item) => (
                                <MenuItem key={item.label} item={item} isOpen={true} />
                            ))}
                            <div className="mt-4 px-2 flex items-center">
                                <SignedOut>
                                    <SignInButton />
                                </SignedOut>
                                <SignedIn>
                                    <UserButton />
                                    <span className="ml-2">{user?.firstName}</span>
                                </SignedIn>
                            </div>
                        </div>
                    </ScrollArea>
                </SheetContent>
            </Sheet>
        </>
    )
}
