import Link from "next/link"
import { BookOpen, BarChart, Users, FileText, CalendarClock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const systems = [
    {
      id: "acs",
      name: "입학상담 솔루션",
      description: "모집요강, 학과정보 조회 및 맞춤형 상담 서비스 제공",
      icon: <Users className="h-12 w-12 mb-4 text-primary" />,
      path: "/acs",
    },
    {
      id: "adm",
      name: "입학관리시스템",
      description: "원서접수, 평가, 사정, 합격, 등록 관리 등 입학 전체 프로세스 지원",
      icon: <FileText className="h-12 w-12 mb-4 text-primary" />,
      path: "/adm",
    },
    {
      id: "ipe",
      name: "면접·실기 평가시스템",
      description: "면접 및 실기 평가 프로세스의 효율적 관리와 평가 수행",
      icon: <CalendarClock className="h-12 w-12 mb-4 text-primary" />,
      path: "/ipe",
    },
    {
      id: "rrm",
      name: "녹취·충원관리 시스템",
      description: "충원 과정의 효율적 관리와 상담 내용 녹취 기능 제공",
      icon: <BarChart className="h-12 w-12 mb-4 text-primary" />,
      path: "/rrm",
    },
    {
      id: "tprf",
      name: "등록금 수납·환불 시스템",
      description: "등록금 수납 및 환불 과정 관리와 실시간 모니터링",
      icon: <BookOpen className="h-12 w-12 mb-4 text-primary" />,
      path: "/tprf",
    },
  ]

  return (
    <div className="container py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">수원여자대학교 입시지원시스템</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          입학 상담부터 원서접수, 평가, 합격자 발표, 등록금 수납까지 입학 전체 프로세스를 통합적으로 지원하는
          시스템입니다.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {systems.map((system) => (
          <Card key={system.id} className="flex flex-col">
            <CardHeader className="text-center">
              <div className="flex justify-center">{system.icon}</div>
              <CardTitle>{system.name}</CardTitle>
              <CardDescription>{system.description}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto pt-4">
              <Button asChild className="w-full">
                <Link href={system.path}>접속하기</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
