"use client"
import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "./ui/menubar"
import Link from "next/link"

// This is sample data.
const data = {
  versions: ["lgo out"],
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Home Page",
          url: "/dashboard/",
        },
        {
          title: "Products",
          url: "/dashboard/products",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger className="w-full" >{JSON.parse(localStorage.getItem("userSignUp") || "{}")?.username}</MenubarTrigger>
            <MenubarContent>
              <Link href={"/"}>
                <MenubarItem>Log Out</MenubarItem>
              </Link>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
