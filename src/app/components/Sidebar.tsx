'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger, } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Home, CheckSquare, Repeat, Target, Calendar, BarChart2, Link, Bell, User, HelpCircle, Menu, ChevronDown, ChevronRight } from 'lucide-react'
import Navbar from './Navbar'

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false)

    const sidebarItems = [
        { label: 'Home', icon: <Home size={20} />, hasDropdown: false },
        {
            label: 'Tasks',
            icon: <CheckSquare size={20} />,
            hasDropdown: true,
            dropdownItems: ['View All Tasks', 'Add New Task', 'Task Categories']
        },
        { label: 'Habits', icon: <Repeat size={20} />, hasDropdown: false },
        {
            label: 'Goals',
            icon: <Target size={20} />,
            hasDropdown: true,
            dropdownItems: ['View All Goals', 'Add New Goal']
        },
        {
            label: 'Calendar',
            icon: <Calendar size={20} />,
            hasDropdown: true,
            dropdownItems: ['Daily View', 'Weekly View', 'Monthly View']
        },
        { label: 'Reports', icon: <BarChart2 size={20} />, hasDropdown: false },
        {
            label: 'Integrations',
            icon: <Link size={20} />,
            hasDropdown: true,
            dropdownItems: ['Google Calendar Sync', 'Notion Integration']
        },
        { label: 'Notifications', icon: <Bell size={20} />, hasDropdown: false },
        { label: 'Help', icon: <HelpCircle size={20} />, hasDropdown: false }
    ]


    const SidebarContent = () => (
        <div className="flex h-full flex-col gap-4">
            <div className="flex h-[60px] items-center border-b px-6">
                <h2 className="text-lg font-semibold text-blue-700">FocusFlow-Hub</h2>
            </div>
            <ScrollArea className="flex-1 px-4">
                <div className="flex flex-col gap-2">
                    {sidebarItems.map((item, index) => (
                        <div key={index}>
                            {item.hasDropdown ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="w-full justify-start gap-2">
                                            {item.icon}
                                            {item.label}
                                            <ChevronDown className="ml-auto h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        {item.dropdownItems?.map((dropdownItem, i) => (
                                            <DropdownMenuItem key={i}>{dropdownItem}</DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Button variant="ghost" className="w-full justify-start gap-2">
                                    {item.icon}
                                    {item.label}
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )

    return (
        <div className="flex h-screen">
            {/* Desktop Sidebar */}
            <aside className={cn(
                "hidden lg:flex flex-col w-64 border-r bg-background transition-all duration-300",
                isOpen ? "lg:w-64" : "lg:w-[15%]"
            )}>
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="lg:hidden">
                        <Menu />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                    <SidebarContent />
                </SheetContent>
            </Sheet>
            <main className="flex-1 overflow-auto p-4">
                <Navbar />
            </main>
        </div>
    )
}
