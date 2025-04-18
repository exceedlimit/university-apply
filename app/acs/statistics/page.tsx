"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { addDays } from "date-fns"
import { Calendar, DownloadIcon } from "lucide-react"

// 샘플 데이터
const DAILY_STATS = [
  { date: "05/01", count: 15 },
  { date: "05/02", count: 22 },
  { date: "05/03", count: 18 },
  { date: "05/04", count: 26 },
  { date: "05/05", count: 20 },
  { date: "05/06", count: 32 },
  { date: "05/07", count: 28 },
]

const DEPARTMENT_STATS = [
  { name: "공과대학", value: 35 },
  { name: "경영대학", value: 25 },
  { name: "인문대학", value: 15 },
  { name: "사회과학대학", value: 10 },
  { name: "자연과학대학", value: 8 },
  { name: "기타", value: 7 },
]

const ADMISSION_STATS = [
  { name: "학생부종합", value: 40 },
  { name: "학생부교과", value: 30 },
  { name: "수능위주", value: 20 },
  { name: "실기위주", value: 10 },
]

const GRADE_STATS = [
  { grade: "1등급", 수시: 15, 정시: 22 },
  { grade: "2등급", 수시: 25, 정시: 18 },
  { grade: "3등급", 수시: 20, 정시: 12 },
  { grade: "4등급", 수시: 12, 정시: 8 },
  { grade: "5등급", 수시: 8, 정시: 5 },
  { grade: "6등급 이하", 수시: 5, 정시: 2 },
]

const MONTHLY_STATS = [
  { month: "1월", count: 45 },
  { month: "2월", count: 70 },
  { month: "3월", count: 65 },
  { month: "4월", count: 50 },
  { month: "5월", count: 45 },
  { month: "6월", count: 60 },
  { month: "7월", count: 75 },
  { month: "8월", count: 120 },
  { month: "9월", count: 150 },
  { month: "10월", count: 110 },
  { month: "11월", count: 85 },
  { month: "12월", count: 60 },
]

export default function StatisticsPage() {
  // 필터링 상태
  const [date, setDate] = useState({
    from: addDays(new Date(), -7),
    to: new Date(),
  })
  const [departmentFilter, setDepartmentFilter] = useState<string>("all")

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

  return (
    <div className="grid gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">상담 사용 통계</h2>
          <p className="text-muted-foreground">입학상담 시스템의 사용 현황 및 통계를 제공합니다.</p>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <DatePickerWithRange date={date} setDate={setDate} />

          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="단과대학 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 단과대학</SelectItem>
              <SelectItem value="engineering">공과대학</SelectItem>
              <SelectItem value="business">경영대학</SelectItem>
              <SelectItem value="humanities">인문대학</SelectItem>
              <SelectItem value="social">사회과학대학</SelectItem>
              <SelectItem value="science">자연과학대학</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <DownloadIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">금일 상담건수</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">전일 대비 +3 (12%)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">주간 상담건수</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">147</div>
            <p className="text-xs text-muted-foreground">전주 대비 +22 (17.6%)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">월간 상담건수</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">493</div>
            <p className="text-xs text-muted-foreground">전월 대비 -45 (-8.4%)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">연간 상담건수</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,845</div>
            <p className="text-xs text-muted-foreground">전년 대비 +320 (12.7%)</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="daily">
        <TabsList className="grid grid-cols-4 w-full max-w-xl">
          <TabsTrigger value="daily">일별 통계</TabsTrigger>
          <TabsTrigger value="departments">학과별 통계</TabsTrigger>
          <TabsTrigger value="admissions">전형별 통계</TabsTrigger>
          <TabsTrigger value="grades">성적대별 통계</TabsTrigger>
        </TabsList>

        <TabsContent value="daily">
          <Card>
            <CardHeader>
              <CardTitle>일별 상담건수</CardTitle>
              <CardDescription>일별 상담건수 추이를 보여줍니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={DAILY_STATS} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="count"
                      name="상담건수"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-sm text-muted-foreground">
                최근 7일간의 상담건수입니다. 필터를 통해 기간을 변경할 수 있습니다.
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="departments">
          <Card>
            <CardHeader>
              <CardTitle>단과대학/학과별 상담비율</CardTitle>
              <CardDescription>관심 단과대학 및 학과별 상담 비율을 보여줍니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={DEPARTMENT_STATS}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {DEPARTMENT_STATS.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}건`, ""]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admissions">
          <Card>
            <CardHeader>
              <CardTitle>전형별 상담비율</CardTitle>
              <CardDescription>관심 전형별 상담 비율을 보여줍니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ADMISSION_STATS}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {ADMISSION_STATS.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}건`, ""]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grades">
          <Card>
            <CardHeader>
              <CardTitle>성적대별 상담건수</CardTitle>
              <CardDescription>지원자 성적대별 상담건수를 보여줍니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={GRADE_STATS} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="grade" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="수시" fill="#8884d8" />
                    <Bar dataKey="정시" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>월별 상담건수 추이</CardTitle>
          <CardDescription>월별 상담건수 추이를 보여줍니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MONTHLY_STATS} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" name="상담건수" stroke="#0088FE" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            연간 상담건수 추이를 확인할 수 있습니다. 8-9월(수시)과 12-1월(정시) 기간에 상담이 집중됩니다.
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
