import type React from "react"
import type { Metadata } from "next"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

// ADM 레이아웃 메타데이터 변경
export const metadata: Metadata = {
  title: "입학관리시스템 | 수원여자대학교 입시지원시스템",
  description: "원서접수, 평가, 사정, 합격, 등록 관리 등 입학 전체 프로세스 지원",
}

interface ADMLayoutProps {
  children: React.ReactNode
}

export default function ADMLayout({ children }: ADMLayoutProps) {
  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">입학관리시스템</h1>
        <p className="text-muted-foreground">
          원서접수, 평가, 사정, 합격, 등록 관리 등 입학 전체 프로세스를 지원합니다.
        </p>
      </div>
      <AdmTabs />
      <div className="mt-6">{children}</div>
    </div>
  )
}

function AdmTabs() {
  return (
    <Tabs defaultValue="application" className="w-full">
      <TabsList className="grid w-full grid-cols-6 h-auto">
        <TabsTrigger value="application" asChild>
          <Link href="/adm">원서접수</Link>
        </TabsTrigger>
        <TabsTrigger value="evaluation" asChild>
          <Link href="/adm/evaluation">평가관리</Link>
        </TabsTrigger>
        <TabsTrigger value="admission" asChild>
          <Link href="/adm/admission">사정관리</Link>
        </TabsTrigger>
        <TabsTrigger value="acceptance" asChild>
          <Link href="/adm/acceptance">합격관리</Link>
        </TabsTrigger>
        <TabsTrigger value="registration" asChild>
          <Link href="/adm/registration">등록업무</Link>
        </TabsTrigger>
        <TabsTrigger value="academic" asChild>
          <Link href="/adm/academic">학사이관</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
