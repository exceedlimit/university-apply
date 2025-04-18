import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Building2, GraduationCap, PenTool, SearchCheck, UsersRound } from "lucide-react"

export default function AcsInfoPage() {
  return (
    <div className="grid gap-6">
      <h2 className="text-2xl font-bold tracking-tight">입학상담 정보제공</h2>

      <Tabs defaultValue="guide" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="guide">모집요강</TabsTrigger>
          <TabsTrigger value="departments">학과정보</TabsTrigger>
          <TabsTrigger value="admission">전형안내</TabsTrigger>
        </TabsList>

        <TabsContent value="guide" className="space-y-4 mt-6">
          <h3 className="text-xl font-semibold">2025학년도 모집요강</h3>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>수시모집</CardTitle>
                <CardDescription>2024년 9월</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  학생부종합, 학생부교과, 실기/실적 위주 전형의 수시모집 안내입니다.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  자세히 보기
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>정시모집</CardTitle>
                <CardDescription>2024년 12월</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">수능위주, 실기/실적 위주 전형의 정시모집 안내입니다.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  자세히 보기
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>편입학</CardTitle>
                <CardDescription>2024년 12월</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">일반편입학, 학사편입학 등 편입학 전형 안내입니다.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  자세히 보기
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Accordion type="single" collapsible className="mt-6">
            <AccordionItem value="item-1">
              <AccordionTrigger>모집단위 및 모집인원</AccordionTrigger>
              <AccordionContent>
                <div className="text-sm">
                  <p>수시모집: 총 2,000명</p>
                  <p>정시모집: 총 1,000명</p>
                  <p>편입학: 총 300명</p>
                  <Button variant="link" className="p-0">
                    상세 모집인원 확인하기
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>전형일정</AccordionTrigger>
              <AccordionContent>
                <div className="text-sm grid gap-2">
                  <p className="font-medium">수시모집</p>
                  <p>원서접수: 2024.09.06(금) ~ 09.10(화)</p>
                  <p>서류제출: 2024.09.06(금) ~ 09.11(수)</p>
                  <p>면접/실기: 2024.10.15(화) ~ 10.30(수)</p>
                  <p>합격자 발표: 2024.11.15(금)</p>

                  <p className="font-medium mt-2">정시모집</p>
                  <p>원서접수: 2024.12.27(금) ~ 12.31(화)</p>
                  <p>서류제출: 2024.12.27(금) ~ 2025.01.03(금)</p>
                  <p>면접/실기: 2025.01.15(수) ~ 01.25(토)</p>
                  <p>합격자 발표: 2025.02.04(화)</p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>지원자격</AccordionTrigger>
              <AccordionContent>
                <div className="text-sm">
                  <p>고등학교 졸업(예정)자 또는 법령에 의하여 고등학교 졸업자와 동등한 학력이 있다고 인정된 자</p>
                  <p className="mt-2">※ 전형별 세부 지원자격은 모집요강 확인</p>
                  <Button variant="link" className="p-0">
                    전형별 지원자격 확인하기
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>제출서류</AccordionTrigger>
              <AccordionContent>
                <div className="text-sm">
                  <p className="font-medium">공통 제출서류</p>
                  <p>- 입학원서(인터넷 접수 후 출력)</p>
                  <p>- 학교생활기록부(학생부종합, 교과 전형)</p>
                  <p>- 자기소개서(학생부종합 전형)</p>

                  <p className="font-medium mt-2">추가 제출서류</p>
                  <p>※ 전형별 세부 제출서류는 모집요강 확인</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4 mt-6">
          <h3 className="text-xl font-semibold">학과/전공 안내</h3>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-center mb-2">
                  <GraduationCap className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-center">인문대학</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <ul className="list-disc pl-5 space-y-1">
                  <li>국어국문학과</li>
                  <li>영어영문학과</li>
                  <li>사학과</li>
                  <li>철학과</li>
                  <li>문화인류학과</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  자세히 보기
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-center mb-2">
                  <Building2 className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-center">사회과학대학</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <ul className="list-disc pl-5 space-y-1">
                  <li>경제학과</li>
                  <li>정치외교학과</li>
                  <li>행정학과</li>
                  <li>사회학과</li>
                  <li>심리학과</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  자세히 보기
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-center mb-2">
                  <PenTool className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-center">공과대학</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <ul className="list-disc pl-5 space-y-1">
                  <li>기계공학과</li>
                  <li>전기전자공학과</li>
                  <li>컴퓨터공학과</li>
                  <li>화학공학과</li>
                  <li>건축공학과</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  자세히 보기
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-6">
            <Button variant="outline">전체 학과 보기</Button>
          </div>
        </TabsContent>

        <TabsContent value="admission" className="space-y-4 mt-6">
          <h3 className="text-xl font-semibold">전형 안내</h3>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex justify-center mb-2">
                  <BookOpen className="h-10 w-10 text-primary" />
                </div>
                <CardTitle>학생부종합전형</CardTitle>
                <CardDescription>학교생활기록부와 자기소개서를 통해 학생의 성장과정을 정성적으로 평가</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p className="font-medium">전형방법</p>
                  <p>1단계: 서류 100% (3배수)</p>
                  <p>2단계: 1단계 성적 70% + 면접 30%</p>

                  <p className="font-medium mt-3">전형유형</p>
                  <p>- 학교장추천전형</p>
                  <p>- 일반전형</p>
                  <p>- 사회배려자전형</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  자세히 보기
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-center mb-2">
                  <SearchCheck className="h-10 w-10 text-primary" />
                </div>
                <CardTitle>학생부교과전형</CardTitle>
                <CardDescription>교과 성적을 정량적으로 평가하는 전형</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p className="font-medium">전형방법</p>
                  <p>학생부 교과 100%</p>
                  <p>※ 일부 학과 면접 실시</p>

                  <p className="font-medium mt-3">전형유형</p>
                  <p>- 교과우수자전형</p>
                  <p>- 지역인재전형</p>
                  <p>- 농어촌학생전형</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  자세히 보기
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex justify-center mb-2">
                  <UsersRound className="h-10 w-10 text-primary" />
                </div>
                <CardTitle>수능위주전형</CardTitle>
                <CardDescription>대학수학능력시험 성적을 중심으로 평가하는 전형</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p className="font-medium">전형방법</p>
                  <p>수능 100%</p>
                  <p>※ 예체능계열 일부: 수능 + 실기</p>

                  <p className="font-medium mt-3">모집 시기</p>
                  <p>- 정시모집 가/나/다군</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  자세히 보기
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-center mb-2">
                  <PenTool className="h-10 w-10 text-primary" />
                </div>
                <CardTitle>실기/실적 위주 전형</CardTitle>
                <CardDescription>예체능 계열 지원자의 실기 능력을 평가하는 전형</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p className="font-medium">전형방법</p>
                  <p>- 음악계열: 실기 80% + 학생부 20%</p>
                  <p>- 미술계열: 실기 70% + 학생부 30%</p>
                  <p>- 체육계열: 실기 60% + 학생부 40%</p>

                  <p className="font-medium mt-3">모집 시기</p>
                  <p>- 수시 및 정시모집</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  자세히 보기
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
