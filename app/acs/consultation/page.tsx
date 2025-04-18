"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ChevronRight, HelpCircle, Info, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const consultationFormSchema = z.object({
  studentName: z.string().min(2, { message: "이름은 2글자 이상이어야 합니다." }),
  studentContact: z.string().min(10, { message: "올바른 연락처를 입력해주세요." }),
  highSchool: z.string().min(2, { message: "학교명을 입력해주세요." }),
  grade: z.string({ required_error: "학년을 선택해주세요." }),
  koreanGrade: z.string().min(1, { message: "국어 성적을 입력해주세요." }),
  mathGrade: z.string().min(1, { message: "수학 성적을 입력해주세요." }),
  englishGrade: z.string().min(1, { message: "영어 성적을 입력해주세요." }),
  socialGrade: z.string().min(1, { message: "사회탐구 성적을 입력해주세요." }),
  scienceGrade: z.string().min(1, { message: "과학탐구 성적을 입력해주세요." }),
  interestedDepartment: z.string().min(1, { message: "관심 학과를 입력해주세요." }),
  consultationContent: z.string().min(10, { message: "상담 내용은 10글자 이상이어야 합니다." }),
})

export default function ConsultationPage() {
  const [analysisResult, setAnalysisResult] = useState<null | {
    recommendedDepartments: { name: string; probability: number; description: string }[]
    recommendedAdmissions: { name: string; description: string; requirements: string }[]
  }>(null)

  const form = useForm<z.infer<typeof consultationFormSchema>>({
    resolver: zodResolver(consultationFormSchema),
    defaultValues: {
      studentName: "",
      studentContact: "",
      highSchool: "",
      grade: "",
      koreanGrade: "",
      mathGrade: "",
      englishGrade: "",
      socialGrade: "",
      scienceGrade: "",
      interestedDepartment: "",
      consultationContent: "",
    },
  })

  function onSubmit(values: z.infer<typeof consultationFormSchema>) {
    console.log(values)
    // 실제로는 서버에 데이터를 전송하고 분석 결과를 받아옵니다.
    // 여기서는 예시 데이터로 대체합니다.
    setAnalysisResult({
      recommendedDepartments: [
        {
          name: "컴퓨터공학과",
          probability: 85,
          description: "컴퓨터의 하드웨어 및 소프트웨어를 연구하는 학문",
        },
        {
          name: "소프트웨어학과",
          probability: 78,
          description: "소프트웨어 개발 및 시스템 설계에 특화된 학과",
        },
        {
          name: "정보통신공학과",
          probability: 72,
          description: "정보통신 기술과 네트워크 시스템을 연구하는 학과",
        },
      ],
      recommendedAdmissions: [
        {
          name: "학생부종합 일반전형",
          description: "서류평가와 면접을 통해 학생의 성장가능성을 평가",
          requirements: "3학년 1학기까지의 학생부, 자기소개서",
        },
        {
          name: "학생부교과 일반전형",
          description: "내신 성적 위주로 평가하는 전형",
          requirements: "3학년 1학기까지의 학생부, 검정고시 합격자는 검정고시 성적",
        },
        {
          name: "정시 일반전형",
          description: "수능 성적을 바탕으로 선발하는 전형",
          requirements: "대학수학능력시험 성적",
        },
      ],
    })
  }

  return (
    <div className="grid gap-6">
      <h2 className="text-2xl font-bold tracking-tight">상담 입력·맞춤 분석</h2>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>상담 정보 입력</CardTitle>
            <CardDescription>학생 정보와 성적을 입력하여 맞춤형 상담을 제공합니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">기본 정보</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="studentName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>이름</FormLabel>
                          <FormControl>
                            <Input placeholder="홍길동" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="studentContact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>연락처</FormLabel>
                          <FormControl>
                            <Input placeholder="010-1234-5678" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="highSchool"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>출신고교</FormLabel>
                          <FormControl>
                            <Input placeholder="OO고등학교" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="grade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>학년</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="학년 선택" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1">고등학교 1학년</SelectItem>
                              <SelectItem value="2">고등학교 2학년</SelectItem>
                              <SelectItem value="3">고등학교 3학년</SelectItem>
                              <SelectItem value="graduate">졸업생</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">성적 정보</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="koreanGrade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>국어</FormLabel>
                          <FormControl>
                            <Input placeholder="등급 입력" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="mathGrade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>수학</FormLabel>
                          <FormControl>
                            <Input placeholder="등급 입력" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="englishGrade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>영어</FormLabel>
                          <FormControl>
                            <Input placeholder="등급 입력" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="socialGrade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>사회탐구</FormLabel>
                          <FormControl>
                            <Input placeholder="등급 입력" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="scienceGrade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>과학탐구</FormLabel>
                          <FormControl>
                            <Input placeholder="등급 입력" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">상담 정보</h3>
                  <FormField
                    control={form.control}
                    name="interestedDepartment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>관심 학과</FormLabel>
                        <FormControl>
                          <Input placeholder="컴퓨터공학과, 경영학과 등" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="consultationContent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>상담 내용</FormLabel>
                        <FormControl>
                          <Textarea placeholder="상담 내용을 입력해주세요." className="resize-none h-20" {...field} />
                        </FormControl>
                        <FormDescription>
                          성적, 희망 전공, A/B 유형 등 상담에 필요한 내용을 입력해주세요.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full">
                  분석 시작
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div>
          {analysisResult ? (
            <Card>
              <CardHeader>
                <CardTitle>맞춤형 분석 결과</CardTitle>
                <CardDescription>입력하신 정보를 바탕으로 분석한 결과입니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs defaultValue="departments">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="departments">추천 학과</TabsTrigger>
                    <TabsTrigger value="admissions">추천 전형</TabsTrigger>
                  </TabsList>
                  <TabsContent value="departments" className="mt-4 space-y-4">
                    {analysisResult.recommendedDepartments.map((dept, index) => (
                      <Card key={index}>
                        <CardHeader className="py-4">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-lg">{dept.name}</CardTitle>
                            <Badge variant={index === 0 ? "default" : "outline"}>{dept.probability}% 적합</Badge>
                          </div>
                          <CardDescription>{dept.description}</CardDescription>
                        </CardHeader>
                        <CardFooter className="py-2 justify-end">
                          <Button variant="ghost" size="sm" className="gap-1">
                            자세히 보기 <ChevronRight className="h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </TabsContent>
                  <TabsContent value="admissions" className="mt-4 space-y-4">
                    {analysisResult.recommendedAdmissions.map((admission, index) => (
                      <Card key={index}>
                        <CardHeader className="py-4">
                          <CardTitle className="text-lg">{admission.name}</CardTitle>
                          <CardDescription>{admission.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="py-0">
                          <div className="flex items-start gap-2 text-sm">
                            <Info className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <span>
                              <strong>제출 서류:</strong> {admission.requirements}
                            </span>
                          </div>
                        </CardContent>
                        <CardFooter className="py-2 justify-end">
                          <Button variant="ghost" size="sm" className="gap-1">
                            자세히 보기 <ChevronRight className="h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </TabsContent>
                </Tabs>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>참고사항</AlertTitle>
                  <AlertDescription>
                    이 결과는 입력하신 정보를 바탕으로 한 예상 결과입니다. 정확한 상담을 위해 수원여자대학교 입학처로
                    문의하시기 바랍니다.
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  상담 결과 저장
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>맞춤형 분석 결과</CardTitle>
                <CardDescription>학생 정보와 성적을 입력하면 맞춤형 분석 결과를 확인할 수 있습니다.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-10 space-y-4">
                <div className="flex justify-center items-center rounded-full bg-muted p-6">
                  <HelpCircle className="h-10 w-10 text-muted-foreground" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="font-medium text-lg">정보 입력 대기 중</h3>
                  <p className="text-muted-foreground">왼쪽 양식에 정보를 입력한 후 '분석 시작' 버튼을 클릭하세요.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
