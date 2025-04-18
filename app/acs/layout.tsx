import type React from "react"
import type { Metadata } from "next"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

// ACS 레이아웃 메타데이터 변경
export const metadata: Metadata = {
  title: "입학상담 솔루션 | 수원여자대학교 입시지원시스템",
  description: "모집요강, 학과정보 조회 및 맞춤형 상담 서비스 제공",
}

interface ACSLayoutProps {
  children: React.ReactNode
}

export default function ACSLayout({ children }: ACSLayoutProps) {
  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">입학상담 솔루션</h1>
        <p className="text-muted-foreground">모집요강, 학과정보 조회 및 맞춤형 상담 서비스를 제공합니다.</p>
      </div>
      <AcsTabs />
      <div className="mt-6">{children}</div>
    </div>
  )
}

function AcsTabs() {
  return (
    <Tabs defaultValue="info" className="w-full">
      <TabsList className="grid w-full grid-cols-5 h-auto">
        <TabsTrigger value="info" asChild>
          <Link href="/acs">정보제공</Link>
        </TabsTrigger>
        <TabsTrigger value="consultation" asChild>
          <Link href="/acs/consultation">상담 입력·분석</Link>
        </TabsTrigger>
        <TabsTrigger value="visualization" asChild>
          <Link href="/acs/visualization">성적 시각화</Link>
        </TabsTrigger>
        <TabsTrigger value="statistics" asChild>
          <Link href="/acs/statistics">상담 통계</Link>
        </TabsTrigger>
        <TabsTrigger value="admin" asChild>
          <Link href="/acs/admin">관리자</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
