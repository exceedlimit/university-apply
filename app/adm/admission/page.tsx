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
import { Progress } from "@/components/ui/progress"

// 샘플 데이터
const EVALUATION_ITEMS = [
  { id: 1, name: "학생부", maxScore: 400, weight: 40 },
  { id: 2, name: "수능", maxScore: 400, weight: 40 },
  { id: 3, name: "면접", maxScore: 100, weight: 10 },
  { id: 4, name: "서류", maxScore: 100, weight: 10 },
]

const APPLICANTS_DATA = [
  {
    id: "2024-0001",
    name: "김지원",
    department: "컴퓨터공학과",
    schoolRecord: 380,
    csat: 375,
    interview: 92,
    document: 88,
    total: 935,
    rank: 1,
  },
  {
    id: "2024-0002",
    name: "이수진",
    department: "경영학과",
    schoolRecord: 365,
    csat: 362,
    interview: 85,
    document: 90,
    total: 902,
    rank: 2,
  },
  {
    id: "2024-0003",
    name: "박민수",
    department: "전자공학과",
    schoolRecord: 370,
    csat: 358,
    interview: 88,
    document: 85,
    total: 901,
    rank: 3,
  },
  {
    id: "2024-0004",
    name: "최영희",
    department: "국어국문학과",
    schoolRecord: 375,
    csat: 345,
    interview: 95,
    document: 82,
    total: 897,
    rank: 4,
  },
  {
    id: "2024-0005",
    name: "정현우",
    department: "화학공학과",
    schoolRecord: 355,
    csat: 368,
    interview: 80,
    document: 84,
    total: 887,
    rank: 5,
  },
]

const DEPARTMENTS = [
  { id: 1, name: "컴퓨터공학과", quota: 50, applicants: 250, competition: 5.0 },
  { id: 2, name: "전자공학과", quota: 45, applicants: 180, competition: 4.0 },
  { id: 3, name: "경영학과", quota: 60, applicants: 300, competition: 5.0 },
  { id: 4, name: "국어국문학과", quota: 30, applicants: 90, competition: 3.0 },
  { id: 5, name: "화학공학과", quota: 40, applicants: 160, competition: 4.0 },
]

export default function AdmissionPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null)

  // 검색 필터링된 지원자 목록
  const filteredApplicants = APPLICANTS_DATA.filter(
    (applicant) =>
      applicant.id.includes(searchTerm) ||
      applicant.name.includes(searchTerm) ||
      applicant.department.includes(searchTerm),
  )

  const Actions = () => {
    return (
      <>
        <Action
          name="합격관리 화면 구현"
          description="합격자 데이터 관리, 등록 업무 사전 데이터 가공, 합격자 발표 관리 등의 화면 구현"
        />
        <Action
          name="등록업무 화면 구현"
          description="등록금 데이터 관리, 등록금 고지서 출력, 금융기관 연계 관리 등의 화면 구현"
        />
        <Action name="학사이관 화면 구현" description="학번 부여, 학사 연계, 학사 보고 통계 등의 화면 구현" />
        <Action name="모바일 반응형 개선" description="모바일 디바이스에서의 사용성 개선" />
        <Action name="데이터 시각화 강화" description="차트와 그래프를 활용한 데이터 시각화 기능 강화" />
      </>
    )
  }

  const Action = ({ name, description }: { name: string; description: string }) => {
    return (
      <div>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="score-weight">
        <TabsList className="grid w-full max-w-3xl grid-cols-3">
          <TabsTrigger value="score-weight">
            <Calculator className="h-4 w-4 mr-2" />
            평가요소 배점 관리
          </TabsTrigger>
          <TabsTrigger value="admission-check">
            <Settings className="h-4 w-4 mr-2" />
            사정 점검 관리
          </TabsTrigger>
          <TabsTrigger value="score-calculation">
            <Calculator className="h-4 w-4 mr-2" />
            점수 계산·최종 배점
          </TabsTrigger>
        </TabsList>

        {/* 평가요소 배점 관리 화면 (ADM-SCR-010) */}
        <TabsContent value="score-weight" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">평가요소 배점 관리</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  배점 기준 추가
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>배점 기준 추가</DialogTitle>
                  <DialogDescription>새로운 배점 기준을 추가합니다.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
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
                    <div className="grid gap-2">
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
                  </div>

                  <div className="pt-2">
                    <h3 className="text-sm font-medium mb-4">평가요소별 배점</h3>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>학생부</Label>
                          <span className="text-sm">40%</span>
                        </div>
                        <Slider defaultValue={[40]} max={100} step={5} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>수능</Label>
                          <span className="text-sm">40%</span>
                        </div>
                        <Slider defaultValue={[40]} max={100} step={5} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>면접</Label>
                          <span className="text-sm">10%</span>
                        </div>
                        <Slider defaultValue={[10]} max={100} step={5} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>서류</Label>
                          <span className="text-sm">10%</span>
                        </div>
                        <Slider defaultValue={[10]} max={100} step={5} />
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">취소</Button>
                  <Button>저장</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>전형별 배점 기준</CardTitle>
                <CardDescription>전형 유형별 평가요소 배점 기준을 설정합니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admission-type-select">전형 유형</Label>
                  <Select defaultValue="regular">
                    <SelectTrigger id="admission-type-select">
                      <SelectValue placeholder="전형 유형 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="regular">정시</SelectItem>
                      <SelectItem value="early">수시</SelectItem>
                      <SelectItem value="transfer">편입학</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-2">
                  <h3 className="text-sm font-medium mb-4">평가요소별 배점</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>평가요소</TableHead>
                        <TableHead>최대 점수</TableHead>
                        <TableHead>반영 비율</TableHead>
                        <TableHead className="text-right">작업</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {EVALUATION_ITEMS.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>{item.maxScore}</TableCell>
                          <TableCell>{item.weight}%</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              수정
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="pt-2">
                  <h3 className="text-sm font-medium mb-2">총점</h3>
                  <div className="text-2xl font-bold">1,000점</div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">초기화</Button>
                <Button>저장</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>모집단위별 배점 기준</CardTitle>
                <CardDescription>모집단위(학과)별 평가요소 배점 기준을 설정합니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="department-select">모집단위(학과)</Label>
                  <Select defaultValue="computer">
                    <SelectTrigger id="department-select">
                      <SelectValue placeholder="모집단위 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="computer">컴퓨터공학과</SelectItem>
                      <SelectItem value="electronic">전자공학과</SelectItem>
                      <SelectItem value="mechanical">기계공학과</SelectItem>
                      <SelectItem value="business">경영학과</SelectItem>
                      <SelectItem value="economics">경제학과</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-2">
                  <h3 className="text-sm font-medium mb-4">평가요소별 배점</h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>학생부</Label>
                        <span className="text-sm">40%</span>
                      </div>
                      <Slider defaultValue={[40]} max={100} step={5} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>수능</Label>
                        <span className="text-sm">40%</span>
                      </div>
                      <Slider defaultValue={[40]} max={100} step={5} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>면접</Label>
                        <span className="text-sm">10%</span>
                      </div>
                      <Slider defaultValue={[10]} max={100} step={5} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>서류</Label>
                        <span className="text-sm">10%</span>
                      </div>
                      <Slider defaultValue={[10]} max={100} step={5} />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <h3 className="text-sm font-medium mb-4">수능 영역별 반영 비율</h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>국어</Label>
                        <span className="text-sm">20%</span>
                      </div>
                      <Slider defaultValue={[20]} max={100} step={5} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>수학</Label>
                        <span className="text-sm">35%</span>
                      </div>
                      <Slider defaultValue={[35]} max={100} step={5} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>영어</Label>
                        <span className="text-sm">20%</span>
                      </div>
                      <Slider defaultValue={[20]} max={100} step={5} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>탐구</Label>
                        <span className="text-sm">20%</span>
                      </div>
                      <Slider defaultValue={[20]} max={100} step={5} />
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
                  <CardTitle>동점자 처리 기준</CardTitle>
                  <CardDescription>동점자 발생 시 적용할 처리 기준을 설정합니다.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="tie-admission-type">전형 유형</Label>
                  <Select defaultValue="regular">
                    <SelectTrigger id="tie-admission-type">
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
                  <Label htmlFor="tie-department">모집단위(학과)</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="tie-department">
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
              </div>

              <div className="pt-2">
                <h3 className="text-sm font-medium mb-4">동점자 처리 우선순위</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>우선순위</TableHead>
                      <TableHead>기준</TableHead>
                      <TableHead className="text-right">작업</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>수학 영역 성적</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          수정
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2</TableCell>
                      <TableCell>국어 영역 성적</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          수정
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>3</TableCell>
                      <TableCell>영어 영역 성적</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          수정
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>4</TableCell>
                      <TableCell>탐구 영역 성적</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          수정
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>5</TableCell>
                      <TableCell>한국사 등급</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          수정
                        </Button>
                      </TableCell>
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
        </TabsContent>

        {/* 사정 점검 관리 화면 (ADM-SCR-011) */}
        <TabsContent value="admission-check" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">사정 점검 관리</h2>
            <div className="flex items-center gap-2">
              <Select defaultValue="regular">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="전형 유형 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="regular">정시</SelectItem>
                  <SelectItem value="early">수시</SelectItem>
                  <SelectItem value="transfer">편입학</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base font-medium">전체 모집인원</CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-2xl font-bold">1,245명</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base font-medium">지원자 수</CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-2xl font-bold">5,280명</div>
                <div className="text-sm text-muted-foreground">경쟁률 4.24:1</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base font-medium">사정 완료</CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-2xl font-bold text-green-500">1,245명</div>
                <div className="text-sm text-muted-foreground">100%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base font-medium">동점자 발생</CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-2xl font-bold text-amber-500">12명</div>
                <div className="text-sm text-muted-foreground">5개 모집단위</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>모집단위별 사정 현황</CardTitle>
                  <CardDescription>모집단위별 사정 진행 상황을 확인합니다.</CardDescription>
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
                    <TableHead>모집단위</TableHead>
                    <TableHead>모집인원</TableHead>
                    <TableHead>지원자 수</TableHead>
                    <TableHead>경쟁률</TableHead>
                    <TableHead>사정 상태</TableHead>
                    <TableHead>동점자</TableHead>
                    <TableHead className="text-right">작업</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {DEPARTMENTS.map((dept) => (
                    <TableRow key={dept.id}>
                      <TableCell className="font-medium">{dept.name}</TableCell>
                      <TableCell>{dept.quota}명</TableCell>
                      <TableCell>{dept.applicants}명</TableCell>
                      <TableCell>{dept.competition}:1</TableCell>
                      <TableCell>
                        <Badge>완료</Badge>
                      </TableCell>
                      <TableCell>{dept.id === 1 || dept.id === 3 ? "2명" : "없음"}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2"
                          onClick={() => setSelectedDepartment(dept)}
                        >
                          상세보기
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">총 {DEPARTMENTS.length}개 모집단위</div>
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

          {selectedDepartment && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>{selectedDepartment.name} 사정 상세</CardTitle>
                    <CardDescription>
                      모집인원: {selectedDepartment.quota}명 / 지원자: {selectedDepartment.applicants}명 / 경쟁률:{" "}
                      {selectedDepartment.competition}:1
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setSelectedDepartment(null)}>
                    닫기
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium mb-2">합격선</h3>
                    <div className="text-2xl font-bold">887점</div>
                    <div className="text-sm text-muted-foreground">커트라인 점수</div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">동점자 처리</h3>
                    <div className="text-sm">
                      {selectedDepartment.id === 1 || selectedDepartment.id === 3 ? (
                        <Badge variant="outline" className="mb-2">
                          동점자 2명 발생
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="mb-2">
                          동점자 없음
                        </Badge>
                      )}
                      <p>1순위: 수학 영역 성적</p>
                      <p>2순위: 국어 영역 성적</p>
                      <p>3순위: 영어 영역 성적</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <h3 className="text-sm font-medium mb-4">지원자 점수 분포</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>900점 이상</span>
                        <span>15명</span>
                      </div>
                      <Progress value={15} max={100} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>800~899점</span>
                        <span>45명</span>
                      </div>
                      <Progress value={45} max={100} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>700~799점</span>
                        <span>85명</span>
                      </div>
                      <Progress value={85} max={100} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>600~699점</span>
                        <span>65명</span>
                      </div>
                      <Progress value={65} max={100} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>600점 미만</span>
                        <span>40명</span>
                      </div>
                      <Progress value={40} max={100} className="h-2" />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <h3 className="text-sm font-medium mb-4">합격 예정자 목록</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>순위</TableHead>
                        <TableHead>수험번호</TableHead>
                        <TableHead>이름</TableHead>
                        <TableHead>총점</TableHead>
                        <TableHead>학생부</TableHead>
                        <TableHead>수능</TableHead>
                        <TableHead>면접</TableHead>
                        <TableHead>서류</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {APPLICANTS_DATA.filter((applicant) => applicant.department === selectedDepartment.name).map(
                        (applicant) => (
                          <TableRow key={applicant.id}>
                            <TableCell>{applicant.rank}</TableCell>
                            <TableCell>{applicant.id}</TableCell>
                            <TableCell>{applicant.name}</TableCell>
                            <TableCell className="font-medium">{applicant.total}</TableCell>
                            <TableCell>{applicant.schoolRecord}</TableCell>
                            <TableCell>{applicant.csat}</TableCell>
                            <TableCell>{applicant.interview}</TableCell>
                            <TableCell>{applicant.document}</TableCell>
                          </TableRow>
                        ),
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  사정표 출력
                </Button>
                <Button>
                  <Settings className="h-4 w-4 mr-2" />
                  사정 확정
                </Button>
              </CardFooter>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>사정 회의 관리</CardTitle>
              <CardDescription>사정 회의 일정 및 자료를 관리합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="meeting-date">회의 일시</Label>
                  <Input id="meeting-date" type="datetime-local" defaultValue="2024-05-20T14:00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meeting-place">회의 장소</Label>
                  <Input id="meeting-place" defaultValue="대학본부 3층 대회의실" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meeting-agenda">회의 안건</Label>
                <Input id="meeting-agenda" defaultValue="2024학년도 정시모집 합격자 사정" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meeting-attendees">참석자</Label>
                <Input id="meeting-attendees" defaultValue="입학처장, 입학부처장, 단과대학장, 학과장, 입학사정관" />
              </div>

              <div className="pt-2">
                <h3 className="text-sm font-medium mb-4">회의 자료</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>2024학년도_정시모집_사정자료.pdf</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      다운로드
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>2024학년도_정시모집_동점자처리기준.pdf</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      다운로드
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>2024학년도_정시모집_모집단위별_합격선.xlsx</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      다운로드
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                자료 추가
              </Button>
              <Button>
                <FileText className="h-4 w-4 mr-2" />
                회의록 작성
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* 사정 점수계산·최종 배점 화면 (ADM-SCR-012) */}
        <TabsContent value="score-calculation" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">점수 계산·최종 배점</h2>
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
                  <DropdownMenuItem>전체 지원자</DropdownMenuItem>
                  <DropdownMenuItem>합격 예정자</DropdownMenuItem>
                  <DropdownMenuItem>불합격 예정자</DropdownMenuItem>
                  <DropdownMenuItem>동점자 발생</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>지원자 목록</CardTitle>
                  <CardDescription>지원자 목록 및 점수를 확인하고 관리합니다.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    엑셀 다운로드
                  </Button>
                  <Button variant="outline" size="sm">
                    <Users className="h-4 w-4 mr-2" />
                    일괄 점수 계산
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
                    <TableHead>학과</TableHead>
                    <TableHead>학생부</TableHead>
                    <TableHead>수능</TableHead>
                    <TableHead>면접</TableHead>
                    <TableHead>서류</TableHead>
                    <TableHead>총점</TableHead>
                    <TableHead className="text-right">작업</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplicants.map((applicant) => (
                    <TableRow key={applicant.id}>
                      <TableCell className="font-medium">{applicant.id}</TableCell>
                      <TableCell>{applicant.name}</TableCell>
                      <TableCell>{applicant.department}</TableCell>
                      <TableCell>{applicant.schoolRecord}</TableCell>
                      <TableCell>{applicant.csat}</TableCell>
                      <TableCell>{applicant.interview}</TableCell>
                      <TableCell>{applicant.document}</TableCell>
                      <TableCell className="font-bold">{applicant.total}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <PenLine className="h-4 w-4 mr-2" />
                              점수 수정
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calculator className="h-4 w-4 mr-2" />
                              점수 재계산
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="h-4 w-4 mr-2" />
                              사정표 출력
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
              <div className="text-sm text-muted-foreground">총 {filteredApplicants.length}명</div>
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
      </Tabs>
    </div>
  )
}
