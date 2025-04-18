"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Calculator,
  Download,
  FileText,
  Filter,
  MoreHorizontal,
  PenLine,
  Plus,
  Search,
  Settings,
  Users,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

// 샘플 데이터
const EVALUATION_ITEMS = [
  {
    id: 1,
    name: "학업역량",
    description: "고교 교육과정에서 이루어지는 교과 학습을 통해 지식과 기술을 습득하고 적용하는 능력",
    maxScore: 30,
    evaluationType: "서류",
  },
  {
    id: 2,
    name: "전공적합성",
    description: "고교 교육과정에서 전공(계열)에 필요한 과목을 수강하고 관련 활동을 통해 견고한 기초를 쌓는 능력",
    maxScore: 30,
    evaluationType: "서류",
  },
  {
    id: 3,
    name: "인성",
    description: "공동체의 일원으로서 필요한 바람직한 사고와 행동 특성",
    maxScore: 20,
    evaluationType: "서류",
  },
  {
    id: 4,
    name: "발전가능성",
    description: "현재의 상황이나 수준보다 질적으로 더 높은 단계로 향상될 가능성",
    maxScore: 20,
    evaluationType: "서류",
  },
  {
    id: 5,
    name: "전공이해도",
    description: "지원 전공에 대한 관심과 이해 정도",
    maxScore: 30,
    evaluationType: "면접",
  },
  {
    id: 6,
    name: "논리적 사고력",
    description: "문제를 논리적으로 분석하고 해결하는 능력",
    maxScore: 30,
    evaluationType: "면접",
  },
  {
    id: 7,
    name: "의사소통능력",
    description: "자신의 생각을 효과적으로 전달하고 타인의 의견을 이해하는 능력",
    maxScore: 20,
    evaluationType: "면접",
  },
  {
    id: 8,
    name: "인성 및 가치관",
    description: "공동체 생활에 필요한 기본적인 태도와 자세",
    maxScore: 20,
    evaluationType: "면접",
  },
]

const EVALUATION_RESULTS = [
  {
    id: "2024-0001",
    name: "김지원",
    department: "컴퓨터공학과",
    evaluationType: "서류",
    evaluator: "평가자1",
    score: 85,
    status: "완료",
    date: "2024-05-15",
  },
  {
    id: "2024-0002",
    name: "이수진",
    department: "경영학과",
    evaluationType: "서류",
    evaluator: "평가자2",
    score: 78,
    status: "완료",
    date: "2024-05-15",
  },
  {
    id: "2024-0003",
    name: "박민수",
    department: "전자공학과",
    evaluationType: "서류",
    evaluator: "평가자1",
    score: 92,
    status: "완료",
    date: "2024-05-14",
  },
  {
    id: "2024-0004",
    name: "최영희",
    department: "국어국문학과",
    evaluationType: "면접",
    evaluator: "평가자3",
    score: 88,
    status: "완료",
    date: "2024-05-14",
  },
  {
    id: "2024-0005",
    name: "정현우",
    department: "화학공학과",
    evaluationType: "면접",
    evaluator: "평가자2",
    score: 75,
    status: "완료",
    date: "2024-05-13",
  },
]

export default function EvaluationPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEvaluationItem, setSelectedEvaluationItem] = useState<any>(null)

  // 검색 필터링된 평가 결과
  const filteredResults = EVALUATION_RESULTS.filter(
    (result) =>
      result.id.includes(searchTerm) ||
      result.name.includes(searchTerm) ||
      result.department.includes(searchTerm) ||
      result.evaluator.includes(searchTerm),
  )

  return (
    <div className="space-y-6">
      <Tabs defaultValue="grade-evaluation">
        <TabsList className="grid w-full max-w-3xl grid-cols-4">
          <TabsTrigger value="grade-evaluation">
            <Calculator className="h-4 w-4 mr-2" />
            수능·학생부 평가
          </TabsTrigger>
          <TabsTrigger value="document-evaluation">
            <FileText className="h-4 w-4 mr-2" />
            제출서류 평가
          </TabsTrigger>
          <TabsTrigger value="evaluation-check">
            <Settings className="h-4 w-4 mr-2" />
            평가 확인·보정
          </TabsTrigger>
          <TabsTrigger value="interview-evaluation">
            <Users className="h-4 w-4 mr-2" />
            면접·실기 평가
          </TabsTrigger>
        </TabsList>

        {/* 수능·학생부 평가 관리 화면 (ADM-SCR-005) */}
        <TabsContent value="grade-evaluation" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">수능·학생부 평가 관리</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>수능 성적 평가 기준</CardTitle>
                <CardDescription>수능 성적을 평가 점수로 변환하는 기준을 설정합니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admission-type">전형 유형</Label>
                  <Select defaultValue="regular">
                    <SelectTrigger id="admission-type">
                      <SelectValue placeholder="전형 유형 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="regular">정시</SelectItem>
                      <SelectItem value="early">수시</SelectItem>
                      <SelectItem value="transfer">편입학</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">모집단위(학과)</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="department">
                      <SelectValue placeholder="모집단위 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="computer">컴퓨터공학과</SelectItem>
                      <SelectItem value="electronic">전자공학과</SelectItem>
                      <SelectItem value="mechanical">기계공학과</SelectItem>
                      <SelectItem value="business">경영학과</SelectItem>
                      <SelectItem value="economics">경제학과</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-2">
                  <h3 className="text-sm font-medium mb-4">영역별 반영 비율</h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>국어 영역</Label>
                        <span className="text-sm">20%</span>
                      </div>
                      <Slider defaultValue={[20]} max={100} step={5} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>수학 영역</Label>
                        <span className="text-sm">30%</span>
                      </div>
                      <Slider defaultValue={[30]} max={100} step={5} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>영어 영역</Label>
                        <span className="text-sm">20%</span>
                      </div>
                      <Slider defaultValue={[20]} max={100} step={5} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>탐구 영역</Label>
                        <span className="text-sm">25%</span>
                      </div>
                      <Slider defaultValue={[25]} max={100} step={5} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>한국사</Label>
                        <span className="text-sm">5%</span>
                      </div>
                      <Slider defaultValue={[5]} max={100} step={5} />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <h3 className="text-sm font-medium mb-4">등급별 점수 변환 기준</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>등급</TableHead>
                        <TableHead>1등급</TableHead>
                        <TableHead>2등급</TableHead>
                        <TableHead>3등급</TableHead>
                        <TableHead>4등급</TableHead>
                        <TableHead>5등급</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">점수</TableCell>
                        <TableCell>100</TableCell>
                        <TableCell>95</TableCell>
                        <TableCell>90</TableCell>
                        <TableCell>85</TableCell>
                        <TableCell>80</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Table className="mt-2">
                    <TableHeader>
                      <TableRow>
                        <TableHead>등급</TableHead>
                        <TableHead>6등급</TableHead>
                        <TableHead>7등급</TableHead>
                        <TableHead>8등급</TableHead>
                        <TableHead>9등급</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">점수</TableCell>
                        <TableCell>75</TableCell>
                        <TableCell>70</TableCell>
                        <TableCell>65</TableCell>
                        <TableCell>60</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">초기화</Button>
                <Button>저장</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>학생부 성적 평가 기준</CardTitle>
                <CardDescription>학생부 성적을 평가 점수로 변환하는 기준을 설정합니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admission-type-record">전형 유형</Label>
                  <Select defaultValue="early">
                    <SelectTrigger id="admission-type-record">
                      <SelectValue placeholder="전형 유형 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="early">수시</SelectItem>
                      <SelectItem value="regular">정시</SelectItem>
                      <SelectItem value="transfer">편입학</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department-record">모집단위(학과)</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="department-record">
                      <SelectValue placeholder="모집단위 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="computer">컴퓨터공학과</SelectItem>
                      <SelectItem value="electronic">전자공학과</SelectItem>
                      <SelectItem value="mechanical">기계공학과</SelectItem>
                      <SelectItem value="business">경영학과</SelectItem>
                      <SelectItem value="economics">경제학과</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-2">
                  <h3 className="text-sm font-medium mb-4">학생부 요소별 반영 비율</h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>교과 성적</Label>
                        <span className="text-sm">70%</span>
                      </div>
                      <Slider defaultValue={[70]} max={100} step={5} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>출결 상황</Label>
                        <span className="text-sm">10%</span>
                      </div>
                      <Slider defaultValue={[10]} max={100} step={5} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>봉사 활동</Label>
                        <span className="text-sm">10%</span>
                      </div>
                      <Slider defaultValue={[10]} max={100} step={5} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>수상 경력</Label>
                        <span className="text-sm">10%</span>
                      </div>
                      <Slider defaultValue={[10]} max={100} step={5} />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <h3 className="text-sm font-medium mb-4">반영 교과목</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="korean" className="h-4 w-4" defaultChecked />
                      <Label htmlFor="korean">국어</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="math" className="h-4 w-4" defaultChecked />
                      <Label htmlFor="math">수학</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="english" className="h-4 w-4" defaultChecked />
                      <Label htmlFor="english">영어</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="social" className="h-4 w-4" defaultChecked />
                      <Label htmlFor="social">사회</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="science" className="h-4 w-4" defaultChecked />
                      <Label htmlFor="science">과학</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="history" className="h-4 w-4" />
                      <Label htmlFor="history">한국사</Label>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <h3 className="text-sm font-medium mb-4">학년별 반영 비율</h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>1학년</Label>
                        <span className="text-sm">20%</span>
                      </div>
                      <Slider defaultValue={[20]} max={100} step={5} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>2학년</Label>
                        <span className="text-sm">30%</span>
                      </div>
                      <Slider defaultValue={[30]} max={100} step={5} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>3학년</Label>
                        <span className="text-sm">50%</span>
                      </div>
                      <Slider defaultValue={[50]} max={100} step={5} />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">초기화</Button>
                <Button>저장</Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>평가 결과 미리보기</CardTitle>
                  <CardDescription>설정된 기준에 따른 평가 결과를 미리 확인합니다.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Calculator className="h-4 w-4 mr-2" />
                    일괄 계산
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    엑셀 다운로드
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>수험번호</TableHead>
                    <TableHead>이름</TableHead>
                    <TableHead>모집단위</TableHead>
                    <TableHead>수능 점수</TableHead>
                    <TableHead>학생부 점수</TableHead>
                    <TableHead>총점</TableHead>
                    <TableHead className="text-right">작업</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>2024-0001</TableCell>
                    <TableCell>김지원</TableCell>
                    <TableCell>컴퓨터공학과</TableCell>
                    <TableCell>387.5</TableCell>
                    <TableCell>92.3</TableCell>
                    <TableCell className="font-medium">479.8</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        상세보기
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2024-0002</TableCell>
                    <TableCell>이수진</TableCell>
                    <TableCell>경영학과</TableCell>
                    <TableCell>362.8</TableCell>
                    <TableCell>88.5</TableCell>
                    <TableCell className="font-medium">451.3</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        상세보기
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2024-0003</TableCell>
                    <TableCell>박민수</TableCell>
                    <TableCell>전자공학과</TableCell>
                    <TableCell>395.2</TableCell>
                    <TableCell>94.7</TableCell>
                    <TableCell className="font-medium">489.9</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        상세보기
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">총 3명의 지원자</div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  이전
                </Button>
                <Button variant="outline" size="sm">
                  다음
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* 제출서류 평가요소 관리 화면 (ADM-SCR-006) */}
        <TabsContent value="document-evaluation" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">제출서류 평가요소 관리</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  평가요소 추가
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>평가요소 추가</DialogTitle>
                  <DialogDescription>새로운 평가요소를 추가합니다.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="item-name">평가요소명</Label>
                    <Input id="item-name" placeholder="평가요소명을 입력하세요" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="item-description">설명</Label>
                    <Input id="item-description" placeholder="평가요소에 대한 설명을 입력하세요" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="item-score">최대 점수</Label>
                      <Input id="item-score" type="number" placeholder="최대 점수" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="item-type">평가 유형</Label>
                      <Select defaultValue="document">
                        <SelectTrigger id="item-type">
                          <SelectValue placeholder="평가 유형 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="document">서류</SelectItem>
                          <SelectItem value="interview">면접</SelectItem>
                          <SelectItem value="practical">실기</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">취소</Button>
                  <Button>추가</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>평가요소 목록</CardTitle>
                  <CardDescription>서류, 면접, 실기 평가에 사용되는 평가요소 목록입니다.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="평가 유형 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="document">서류</SelectItem>
                      <SelectItem value="interview">면접</SelectItem>
                      <SelectItem value="practical">실기</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>평가요소명</TableHead>
                    <TableHead>설명</TableHead>
                    <TableHead>최대 점수</TableHead>
                    <TableHead>평가 유형</TableHead>
                    <TableHead className="text-right">작업</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {EVALUATION_ITEMS.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.maxScore}</TableCell>
                      <TableCell>
                        <Badge variant={item.evaluationType === "서류" ? "default" : "secondary"}>
                          {item.evaluationType}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2"
                          onClick={() => setSelectedEvaluationItem(item)}
                        >
                          수정
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {selectedEvaluationItem && (
            <Card>
              <CardHeader>
                <CardTitle>평가요소 수정</CardTitle>
                <CardDescription>선택한 평가요소의 정보를 수정합니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">평가요소명</Label>
                  <Input id="edit-name" defaultValue={selectedEvaluationItem.name} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-description">설명</Label>
                  <Input id="edit-description" defaultValue={selectedEvaluationItem.description} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-score">최대 점수</Label>
                    <Input id="edit-score" type="number" defaultValue={selectedEvaluationItem.maxScore} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-type">평가 유형</Label>
                    <Select defaultValue={selectedEvaluationItem.evaluationType === "서류" ? "document" : "interview"}>
                      <SelectTrigger id="edit-type">
                        <SelectValue placeholder="평가 유형 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="document">서류</SelectItem>
                        <SelectItem value="interview">면접</SelectItem>
                        <SelectItem value="practical">실기</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="pt-2">
                  <h3 className="text-sm font-medium mb-4">평가 기준</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>등급</TableHead>
                        <TableHead>A (매우 우수)</TableHead>
                        <TableHead>B (우수)</TableHead>
                        <TableHead>C (보통)</TableHead>
                        <TableHead>D (미흡)</TableHead>
                        <TableHead>E (매우 미흡)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">점수 범위</TableCell>
                        <TableCell>
                          {selectedEvaluationItem.maxScore * 0.9}-{selectedEvaluationItem.maxScore}
                        </TableCell>
                        <TableCell>
                          {selectedEvaluationItem.maxScore * 0.8}-{selectedEvaluationItem.maxScore * 0.9 - 0.1}
                        </TableCell>
                        <TableCell>
                          {selectedEvaluationItem.maxScore * 0.7}-{selectedEvaluationItem.maxScore * 0.8 - 0.1}
                        </TableCell>
                        <TableCell>
                          {selectedEvaluationItem.maxScore * 0.6}-{selectedEvaluationItem.maxScore * 0.7 - 0.1}
                        </TableCell>
                        <TableCell>0-{selectedEvaluationItem.maxScore * 0.6 - 0.1}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedEvaluationItem(null)}>
                  취소
                </Button>
                <Button>저장</Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        {/* 평가 내용 확인·보정 화면 (ADM-SCR-007) */}
        <TabsContent value="evaluation-check" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">평가 내용 확인·보정</h2>
            <div className="flex items-center gap-2">
              <Input
                placeholder="지원자 검색 (수험번호, 이름, 학과)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-80"
              />
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>전체 평가</DropdownMenuItem>
                  <DropdownMenuItem>서류 평가</DropdownMenuItem>
                  <DropdownMenuItem>면접 평가</DropdownMenuItem>
                  <DropdownMenuItem>실기 평가</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>평가 결과 목록</CardTitle>
                  <CardDescription>각 평가 단계별 평가 결과를 확인하고 수정할 수 있습니다.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    엑셀 다운로드
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>수험번호</TableHead>
                    <TableHead>이름</TableHead>
                    <TableHead>모집단위</TableHead>
                    <TableHead>평가 유형</TableHead>
                    <TableHead>평가자</TableHead>
                    <TableHead>점수</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead>평가일</TableHead>
                    <TableHead className="text-right">작업</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResults.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell>{result.id}</TableCell>
                      <TableCell>{result.name}</TableCell>
                      <TableCell>{result.department}</TableCell>
                      <TableCell>{result.evaluationType}</TableCell>
                      <TableCell>{result.evaluator}</TableCell>
                      <TableCell className="font-medium">{result.score}</TableCell>
                      <TableCell>
                        <Badge variant={result.status === "완료" ? "default" : "outline"}>{result.status}</Badge>
                      </TableCell>
                      <TableCell>{result.date}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <FileText className="h-4 w-4 mr-2" />
                              상세 보기
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <PenLine className="h-4 w-4 mr-2" />
                              점수 수정
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="h-4 w-4 mr-2" />
                              평가표 출력
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">총 {filteredResults.length}건의 평가 결과</div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  이전
                </Button>
                <Button variant="outline" size="sm">
                  다음
                </Button>
              </div>
            </CardFooter>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>평가 통계</CardTitle>
                <CardDescription>평가 유형별 통계 정보를 확인합니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">서류평가 점수 분포</h3>
                    <div className="h-8 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: "75%", transition: "width 0.3s ease-in-out" }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>0</span>
                      <span>25</span>
                      <span>50</span>
                      <span>75</span>
                      <span>100</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">면접평가 점수 분포</h3>
                    <div className="h-8 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-secondary"
                        style={{ width: "65%", transition: "width 0.3s ease-in-out" }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>0</span>
                      <span>25</span>
                      <span>50</span>
                      <span>75</span>
                      <span>100</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <h3 className="text-sm font-medium mb-2">평가자별 평균 점수</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>평가자</TableHead>
                          <TableHead>평가 건수</TableHead>
                          <TableHead>평균 점수</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>평가자1</TableCell>
                          <TableCell>45</TableCell>
                          <TableCell>88.5</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>평가자2</TableCell>
                          <TableCell>38</TableCell>
                          <TableCell>76.5</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>평가자3</TableCell>
                          <TableCell>42</TableCell>
                          <TableCell>82.3</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>평가 이상치 감지</CardTitle>
                <CardDescription>평가 결과 중 이상치를 감지하여 표시합니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">평가자간 점수 차이 (10점 이상)</h3>
                    <Badge>3건</Badge>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>수험번호</TableHead>
                        <TableHead>이름</TableHead>
                        <TableHead>평가자1</TableHead>
                        <TableHead>평가자2</TableHead>
                        <TableHead>점수차</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>2024-0012</TableCell>
                        <TableCell>홍길동</TableCell>
                        <TableCell>85</TableCell>
                        <TableCell>72</TableCell>
                        <TableCell className="font-medium text-red-500">13</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2024-0034</TableCell>
                        <TableCell>김철수</TableCell>
                        <TableCell>92</TableCell>
                        <TableCell>78</TableCell>
                        <TableCell className="font-medium text-red-500">14</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2024-0056</TableCell>
                        <TableCell>이영희</TableCell>
                        <TableCell>88</TableCell>
                        <TableCell>76</TableCell>
                        <TableCell className="font-medium text-red-500">12</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <div className="flex items-center justify-between pt-2">
                    <h3 className="text-sm font-medium">평균 대비 이상치 (±15% 이상)</h3>
                    <Badge>2건</Badge>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>수험번호</TableHead>
                        <TableHead>이름</TableHead>
                        <TableHead>점수</TableHead>
                        <TableHead>평균</TableHead>
                        <TableHead>편차</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>2024-0078</TableCell>
                        <TableCell>박지민</TableCell>
                        <TableCell>98</TableCell>
                        <TableCell>82</TableCell>
                        <TableCell className="font-medium text-green-500">+19.5%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2024-0091</TableCell>
                        <TableCell>최유진</TableCell>
                        <TableCell>65</TableCell>
                        <TableCell>82</TableCell>
                        <TableCell className="font-medium text-red-500">-20.7%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  이상치 전체 보기
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* 면접·실기 평가요소 관리 화면 (ADM-SCR-008) */}
        <TabsContent value="interview-evaluation" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">면접·실기 평가요소 관리</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>면접 평가요소 관리</CardTitle>
                <CardDescription>면접 평가에 사용되는 평가요소를 관리합니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="interview-type">면접 유형</Label>
                  <Select defaultValue="individual">
                    <SelectTrigger id="interview-type">
                      <SelectValue placeholder="면접 유형 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">개별 면접</SelectItem>
                      <SelectItem value="group">집단 면접</SelectItem>
                      <SelectItem value="presentation">발표 면접</SelectItem>
                      <SelectItem value="mmi">다중미니면접(MMI)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interview-department">모집단위(학과)</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="interview-department">
                      <SelectValue placeholder="모집단위 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="computer">컴퓨터공학과</SelectItem>
                      <SelectItem value="electronic">전자공학과</SelectItem>
                      <SelectItem value="mechanical">기계공학과</SelectItem>
                      <SelectItem value="business">경영학과</SelectItem>
                      <SelectItem value="economics">경제학과</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-2">
                  <h3 className="text-sm font-medium mb-4">면접 평가요소</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>평가요소</TableHead>
                        <TableHead>배점</TableHead>
                        <TableHead>비율</TableHead>
                        <TableHead className="text-right">작업</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>전공이해도</TableCell>
                        <TableCell>30</TableCell>
                        <TableCell>30%</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            수정
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>논리적 사고력</TableCell>
                        <TableCell>30</TableCell>
                        <TableCell>30%</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            수정
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>의사소통능력</TableCell>
                        <TableCell>20</TableCell>
                        <TableCell>20%</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            수정
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>인성 및 가치관</TableCell>
                        <TableCell>20</TableCell>
                        <TableCell>20%</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            수정
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="pt-2">
                  <h3 className="text-sm font-medium mb-4">면접 진행 방식</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="interview-time">면접 시간</Label>
                      <span className="text-sm">10분</span>
                    </div>
                    <Slider defaultValue={[10]} min={5} max={30} step={1} />
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="preparation-time">준비 시간</Label>
                      <span className="text-sm">5분</span>
                    </div>
                    <Slider defaultValue={[5]} min={0} max={20} step={1} />
                  </div>
                  <div className="space-y-2 mt-4">
                    <Label htmlFor="evaluator-count">평가위원 수</Label>
                    <Select defaultValue="3">
                      <SelectTrigger id="evaluator-count">
                        <SelectValue placeholder="평가위원 수 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2명</SelectItem>
                        <SelectItem value="3">3명</SelectItem>
                        <SelectItem value="4">4명</SelectItem>
                        <SelectItem value="5">5명</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">초기화</Button>
                <Button>저장</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>실기 평가요소 관리</CardTitle>
                <CardDescription>실기 평가에 사용되는 평가요소를 관리합니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="practical-type">실기 유형</Label>
                  <Select defaultValue="art">
                    <SelectTrigger id="practical-type">
                      <SelectValue placeholder="실기 유형 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="art">미술</SelectItem>
                      <SelectItem value="music">음악</SelectItem>
                      <SelectItem value="physical">체육</SelectItem>
                      <SelectItem value="performance">공연예술</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="practical-department">모집단위(학과)</Label>
                  <Select defaultValue="art">
                    <SelectTrigger id="practical-department">
                      <SelectValue placeholder="모집단위 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="art">미술학과</SelectItem>
                      <SelectItem value="design">디자인학과</SelectItem>
                      <SelectItem value="music">음악학과</SelectItem>
                      <SelectItem value="physical">체육교육과</SelectItem>
                      <SelectItem value="dance">무용학과</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-2">
                  <h3 className="text-sm font-medium mb-4">실기 평가요소</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>평가요소</TableHead>
                        <TableHead>배점</TableHead>
                        <TableHead>비율</TableHead>
                        <TableHead className="text-right">작업</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>구성력</TableCell>
                        <TableCell>30</TableCell>
                        <TableCell>30%</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            수정
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>표현력</TableCell>
                        <TableCell>30</TableCell>
                        <TableCell>30%</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            수정
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>창의성</TableCell>
                        <TableCell>20</TableCell>
                        <TableCell>20%</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            수정
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>완성도</TableCell>
                        <TableCell>20</TableCell>
                        <TableCell>20%</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            수정
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="pt-2">
                  <h3 className="text-sm font-medium mb-4">실기 진행 방식</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="practical-time">실기 시간</Label>
                      <span className="text-sm">240분</span>
                    </div>
                    <Slider defaultValue={[240]} min={60} max={360} step={30} />
                  </div>
                  <div className="space-y-2 mt-4">
                    <Label htmlFor="practical-subject">실기 과제</Label>
                    <Select defaultValue="still-life">
                      <SelectTrigger id="practical-subject">
                        <SelectValue placeholder="실기 과제 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="still-life">정물 소묘</SelectItem>
                        <SelectItem value="figure">인물 소묘</SelectItem>
                        <SelectItem value="color">정물 수채화</SelectItem>
                        <SelectItem value="design">기초 디자인</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 mt-4">
                    <Label htmlFor="evaluator-count-practical">평가위원 수</Label>
                    <Select defaultValue="5">
                      <SelectTrigger id="evaluator-count-practical">
                        <SelectValue placeholder="평가위원 수 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3명</SelectItem>
                        <SelectItem value="5">5명</SelectItem>
                        <SelectItem value="7">7명</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">초기화</Button>
                <Button>저장</Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>면접·실기 평가 연계 설정</CardTitle>
                  <CardDescription>면접·실기 평가시스템(IPE)과의 연계 설정을 관리합니다.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ipe-connection">IPE 시스템 연결 상태</Label>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span>연결됨</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="data-sync">데이터 동기화 주기</Label>
                  <Select defaultValue="realtime">
                    <SelectTrigger id="data-sync">
                      <SelectValue placeholder="동기화 주기 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">실시간</SelectItem>
                      <SelectItem value="hourly">1시간마다</SelectItem>
                      <SelectItem value="daily">1일마다</SelectItem>
                      <SelectItem value="manual">수동 동기화</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-2">
                <h3 className="text-sm font-medium mb-4">데이터 전송 설정</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="send-applicant" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="send-applicant">지원자 정보 전송</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="send-evaluation" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="send-evaluation">평가요소 전송</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="receive-result" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="receive-result">평가 결과 수신</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="receive-attendance" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="receive-attendance">출결 정보 수신</Label>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <h3 className="text-sm font-medium mb-4">최근 동기화 기록</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>동기화 유형</TableHead>
                      <TableHead>일시</TableHead>
                      <TableHead>상태</TableHead>
                      <TableHead>처리 건수</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>지원자 정보 전송</TableCell>
                      <TableCell>2024-05-15 14:30:22</TableCell>
                      <TableCell>
                        <Badge>성공</Badge>
                      </TableCell>
                      <TableCell>125건</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>평가요소 전송</TableCell>
                      <TableCell>2024-05-15 14:30:25</TableCell>
                      <TableCell>
                        <Badge>성공</Badge>
                      </TableCell>
                      <TableCell>8건</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>평가 결과 수신</TableCell>
                      <TableCell>2024-05-15 18:45:10</TableCell>
                      <TableCell>
                        <Badge>성공</Badge>
                      </TableCell>
                      <TableCell>98건</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                연계 로그 보기
              </Button>
              <Button>
                <Settings className="h-4 w-4 mr-2" />
                연계 설정
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
