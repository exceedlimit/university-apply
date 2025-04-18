"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DownloadIcon, Share2 } from "lucide-react"

// 예시 데이터
const SUBJECTS = ["국어", "수학", "영어", "사회", "과학"]
const MAX_GRADE = 9 // 최대 등급 (9등급)

interface GradeData {
  name: string
  grade: number
  average: number
}

interface StatData {
  name: string
  value: number
}

export default function VisualizationPage() {
  const [studentId, setStudentId] = useState<string>("student1")
  const [gradeData, setGradeData] = useState<GradeData[]>([])
  const [statData, setStatData] = useState<StatData[]>([])
  const [comparativeData, setComparativeData] = useState<any[]>([])
  const [trendData, setTrendData] = useState<any[]>([])

  useEffect(() => {
    // 실제로는 API에서 데이터를 가져와야 합니다. 여기서는 샘플 데이터를 사용합니다.

    // 등급 데이터 생성 (낮을수록 좋은 성적)
    const grades = SUBJECTS.map((subject) => ({
      name: subject,
      grade: Math.floor(Math.random() * 3) + 1, // 1~3등급 사이
      average: Math.floor(Math.random() * 3) + 2, // 2~4등급 사이
    }))
    setGradeData(grades)

    // 통계 데이터 생성
    const stats = [
      { name: "1등급", value: Math.floor(Math.random() * 20) },
      { name: "2등급", value: Math.floor(Math.random() * 30) },
      { name: "3등급", value: Math.floor(Math.random() * 25) },
      { name: "4등급", value: Math.floor(Math.random() * 15) },
      { name: "5등급 이하", value: Math.floor(Math.random() * 10) },
    ]
    setStatData(stats)

    // 비교 데이터 생성 (점수로 변환, 높을수록 좋은 성적)
    const comparative = SUBJECTS.map((subject) => {
      const myScore = 100 - (Math.floor(Math.random() * 3) + 1) * 10 // 70~90점
      return {
        subject,
        "내 점수": myScore,
        "합격자 평균": Math.min(myScore + Math.floor(Math.random() * 15), 100),
        "전체 평균": Math.max(myScore - Math.floor(Math.random() * 15), 50),
      }
    })
    setComparativeData(comparative)

    // 트렌드 데이터 생성
    const trend = [
      { name: "1학년 1학기", 평균: Math.floor(Math.random() * 2) + 3 }, // 3~4등급
      { name: "1학년 2학기", 평균: Math.floor(Math.random() * 2) + 2 }, // 2~3등급
      { name: "2학년 1학기", 평균: Math.floor(Math.random() * 2) + 2 }, // 2~3등급
      { name: "2학년 2학기", 평균: Math.floor(Math.random() * 1) + 2 }, // 2~3등급
      { name: "3학년 1학기", 평균: Math.floor(Math.random() * 1) + 1 }, // 1~2등급
    ]
    setTrendData(trend)
  }, [studentId])

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

  return (
    <div className="grid gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">성적 시각화</h2>
          <p className="text-muted-foreground">학생의 성적을 다양한 그래프로 시각화하여 제공합니다.</p>
        </div>

        <div className="flex gap-2 items-center">
          <Select value={studentId} onValueChange={setStudentId}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="학생 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student1">홍길동 (2024001)</SelectItem>
              <SelectItem value="student2">김철수 (2024002)</SelectItem>
              <SelectItem value="student3">이영희 (2024003)</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <DownloadIcon className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="grades">
        <TabsList className="grid grid-cols-4 w-full max-w-xl">
          <TabsTrigger value="grades">교과등급</TabsTrigger>
          <TabsTrigger value="stats">등급 분포</TabsTrigger>
          <TabsTrigger value="comparative">합격자 비교</TabsTrigger>
          <TabsTrigger value="trend">성적 추이</TabsTrigger>
        </TabsList>

        <TabsContent value="grades">
          <Card>
            <CardHeader>
              <CardTitle>교과별 등급</CardTitle>
              <CardDescription>각 교과목별 등급 및 학년 평균과 비교한 결과입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={gradeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, MAX_GRADE]} reversed />
                    <Tooltip formatter={(value) => [`${value}등급`, ""]} />
                    <Legend />
                    <Bar dataKey="grade" name="내 등급" fill="#8884d8" />
                    <Bar dataKey="average" name="학년 평균" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <p>※ 등급은 낮을수록 좋은 성적입니다.</p>
                <p>※ 위 데이터는 최근 학기 기준입니다.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>전체 등급 분포</CardTitle>
              <CardDescription>전체 과목의 등급 분포를 보여줍니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {statData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}개 과목`, ""]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparative">
          <Card>
            <CardHeader>
              <CardTitle>합격자 비교 분석</CardTitle>
              <CardDescription>내 성적과 합격자 평균 성적을 비교한 레이더 차트입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius={150} data={comparativeData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="내 점수" dataKey="내 점수" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Radar name="합격자 평균" dataKey="합격자 평균" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                    <Radar name="전체 평균" dataKey="전체 평균" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <p>※ 점수가 높을수록 좋은 성적입니다. (등급과 반대)</p>
                <p>※ 위 데이터는 최근 학기 기준입니다.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trend">
          <Card>
            <CardHeader>
              <CardTitle>성적 추이</CardTitle>
              <CardDescription>학기별 평균 등급의 변화 추이를 보여줍니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, MAX_GRADE]} reversed />
                    <Tooltip formatter={(value) => [`${value}등급`, ""]} />
                    <Legend />
                    <Line type="monotone" dataKey="평균" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <p>※ 등급은 낮을수록 좋은 성적입니다.</p>
                <p>※ 학기별 전체 과목의 평균 등급입니다.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
