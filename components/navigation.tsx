"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, BarChart, Users, Settings, FileText, CalendarClock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

const systems = [
  {
    id: "acs",
    name: "입학상담 솔루션",
    path: "/acs",
    icon: <Users className="h-4 w-4 mr-2" />,
  },
  {
    id: "adm",
    name: "입학관리시스템",
    path: "/adm",
    icon: <FileText className="h-4 w-4 mr-2" />,
  },
  {
    id: "ipe",
    name: "면접·실기 평가시스템",
    path: "/ipe",
    icon: <CalendarClock className="h-4 w-4 mr-2" />,
  },
  {
    id: "rrm",
    name: "녹취·충원관리 시스템",
    path: "/rrm",
    icon: <BarChart className="h-4 w-4 mr-2" />,
  },
  {
    id: "tprf",
    name: "등록금 수납·환불 시스템",
    path: "/tprf",
    icon: <BookOpen className="h-4 w-4 mr-2" />,
  },
]

export default function Navigation() {
  const pathname = usePathname()
  const currentSystem = systems.find((system) => pathname.startsWith(system.path))

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex mr-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-lg">수원여자대학교 입시지원시스템</span>
          </Link>
        </div>

        {/* 데스크톱 뷰 시스템 네비게이션 */}
        <div className="hidden md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                {currentSystem?.icon}
                {currentSystem?.name || "시스템 선택"}
                <span className="sr-only">시스템 변경</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>시스템 선택</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {systems.map((system) => (
                <DropdownMenuItem key={system.id} asChild>
                  <Link href={system.path} className="flex cursor-pointer items-center">
                    {system.icon}
                    {system.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* 모바일 메뉴 */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden ml-auto">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">메뉴 열기</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="grid gap-6 text-lg font-medium">
              <h2 className="text-xl font-bold">시스템 선택</h2>
              <div className="grid gap-3">
                {systems.map((system) => (
                  <Link
                    key={system.id}
                    href={system.path}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md",
                      pathname.startsWith(system.path)
                        ? "bg-secondary text-secondary-foreground"
                        : "hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    {system.icon}
                    {system.name}
                  </Link>
                ))}
              </div>
            </nav>
          </SheetContent>
        </Sheet>

        {/* 사용자 메뉴 */}
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Settings className="h-5 w-5" />
                <span className="sr-only">설정 메뉴</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>내 계정</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>프로필 설정</DropdownMenuItem>
              <DropdownMenuItem>알림 설정</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>로그아웃</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
