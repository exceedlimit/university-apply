"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Download,
  FileText,
  Filter,
  Mail,
  MoreHorizontal,
  PenLine,
  Phone,
  Plus,
  Search,
  Send,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// 샘플 데이터
const ACCEPTED_APPLICANTS = [
  {
    id: "2024-0001",
    name: "김지원",
    department: "컴퓨터공학과",
    admissionType: "수시",
    score: 935,
    rank: 1,
    status: "최초합격",
    notified: true,
    registered: true,
  },
  {
    id: "2024-0002",
    name: "이수진",
    department: "경영학과",
    admissionType: "수시",
    score: 902,
    rank: 2,
    status: "최초합격",
    notified: true,
    registered: false,
  },
  {
    id: "2024-0003",
    name: "박민수",
    department: "전자공학과",
    admissionType: "수시",
    score: 901,
    rank: 3,
    status: "최초합격",
    notified: true,
    registered: true,
  },
  {
    id: "2024-0004",
    name: "최영희",
    department: "국어국문학과",
    admissionType: "수시",
    score: 897,
    rank: 4,
    status: "최초합격",
    notified: true,
    registered: false,
  },
  {
    id: "2024-0005",
    name: "정현우",
    department: "화학공학과",
    admissionType: "수시",
    score: 887,
    rank: 5,
    status: "최초합격",
    notified: true,
    registered: true,
  },
  {
    id: "2024-0006",
    name: "한미영",
    department: "컴퓨터공학과",
    admissionType: "수시",
    score: 882,
    rank: 6,
    status: "추가합격",
    notified: true,
    registered: false,
  },
  {
    id: "2024-0007",
    name: "송재현",
    department: "경영학과",
    admissionType: "수시",
    score: 878,
    rank: 7,
    status: "추가합격",
    notified: true,
    registered: true,
  },
  {
    id: "2024-0008",
    name: "윤서연",
    department: "전자공학과",
    admissionType: "수시",
    score: 875,
    rank: 8,
    status: "후보",
    notified: false,
    registered: false,
  },
]

const DEPARTMENTS = [
  { id: 1, name: "컴퓨터공학과", quota: 50, accepted: 52, registered: 48, rate: 92.3 },
  { id: 2, name: "전자공학과", quota: 45, accepted: 47, registered: 43, rate: 91.5 },
  { id: 3, name: "경영학과", quota: 60, accepted: 62, registered: 58, rate: 93.5 },
  { id: 4, name: "국어국문학과", quota: 30, accepted: 32, registered: 27, rate: 84.4 },
  { id: 5, name: "화학공학과", quota: 40, accepted: 42, registered: 39, rate: 92.9 },
]

const NOTIFICATION_TEMPLATES = [
  { id: 1, name: "최초합격 통보", type: "SMS/이메일", target: "최초합격자", lastUsed: "2024-05-15" },
  { id: 2, name: "추가합격 통보", type: "SMS/이메일", target: "추가합격자", lastUsed: "2024-05-18" },
  { id: 3, name: "등록 안내", type: "SMS/이메일", target: "모든 합격자", lastUsed: "2024-05-16" },
  { id: 4, name: "등록 마감 안내", type: "SMS", target: "미등록자", lastUsed: "2024-05-19" },
  { id: 5, name: "합격자 오리엔테이션 안내", type: "이메일", target: "등록완료자", lastUsed: "2024-05-20" },
]

export default function AcceptancePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedApplicant, setSelectedApplicant] = useState<any>(null)

  // 검색 필터링된 합격자 목록
  const filteredApplicants = ACCEPTED_APPLICANTS.filter(
    (applicant) =>
      applicant.id.includes(searchTerm) ||
      applicant.name.includes(searchTerm) ||
      applicant.department.includes(searchTerm) ||
      applicant.status.includes(searchTerm),
  )

  return (
    <div className="space-y-6">
      <Tabs defaultValue="acceptance-management">
        <TabsList className="grid w-full max-w-3xl grid-cols-3">
          <TabsTrigger value="acceptance-management">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            합격자 관리
          </TabsTrigger>
          <TabsTrigger value="notification">
            <Mail className="h-4 w-4 mr-2" />
            합격자 발표·통보
          </TabsTrigger>
          <TabsTrigger value="additional-acceptance">
            <Phone className="h-4 w-4 mr-2" />
            추가합격 관리
          </TabsTrigger>
        </TabsList>

        {/* 합격자 관리 화면 */}
        <TabsContent value="acceptance-management" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">합격자 관리</h2>
            <div className="flex items-center gap-2">
              <Input
                placeholder="합격자 검색 (수험번호, 이름, 학과)"
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
                  <DropdownMenuItem>전체 합격자</DropdownMenuItem>
                  <DropdownMenuItem>최초합격자</DropdownMenuItem>
                  <DropdownMenuItem>추가합격자</DropdownMenuItem>
                  <DropdownMenuItem>등록완료자</DropdownMenuItem>
                  <DropdownMenuItem>미등록자</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base font-medium">전체 합격자</CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-2xl font-bold">1,245명</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base font-medium">최초합격자</CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-2xl font-bold text-green-500">1,150명</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base font-medium">추가합격자</CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-2xl font-bold text-amber-500">95명</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base font-medium">등록률</CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-2xl font-bold">92.4%</div>
                <div className="text-sm text-muted-foreground">1,150명 / 1,245명</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>합격자 목록</CardTitle>
                  <CardDescription>합격자 목록 및 등록 현황을 확인합니다.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>수험번호</TableHead>
                        <TableHead>이름</TableHead>
                        <TableHead>모집단위</TableHead>
                        <TableHead>전형유형</TableHead>
                        <TableHead>합격구분</TableHead>
                        <TableHead>통보여부</TableHead>
                        <TableHead>등록여부</TableHead>
                        <TableHead className="text-right">작업</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredApplicants.map((applicant) => (
                        <TableRow key={applicant.id}>
                          <TableCell>{applicant.id}</TableCell>
                          <TableCell>{applicant.name}</TableCell>
                          <TableCell>{applicant.department}</TableCell>
                          <TableCell>{applicant.admissionType}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                applicant.status === "최초합격"
                                  ? "default"
                                  : applicant.status === "추가합격"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {applicant.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {applicant.notified ? (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-amber-500" />
                            )}
                          </TableCell>
                          <TableCell>
                            {applicant.registered ? (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-amber-500" />
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedApplicant(applicant)}
                              className="h-8 px-2"
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
                  <div className="text-sm text-muted-foreground">총 {filteredApplicants.length}명의 합격자</div>
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
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>모집단위별 등록 현황</CardTitle>
                  <CardDescription>모집단위별 합격자 등록 현황을 확인합니다.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {DEPARTMENTS.map((dept) => (
                      <div key={dept.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{dept.name}</span>
                          <span className="text-sm">{dept.rate}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={dept.rate} className="h-2" />
                          <span className="text-xs text-muted-foreground">
                            {dept.registered}/{dept.accepted}명
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    등록 현황 다운로드
                  </Button>
                </CardFooter>
              </Card>

              {selectedApplicant && (
                <Card className="mt-4">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{selectedApplicant.name}</CardTitle>
                        <CardDescription>수험번호: {selectedApplicant.id}</CardDescription>
                      </div>
                      <Badge
                        variant={
                          selectedApplicant.status === "최초합격"
                            ? "default"
                            : selectedApplicant.status === "추가합격"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {selectedApplicant.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="font-medium">모집단위</div>
                      <div>{selectedApplicant.department}</div>
                      <div className="font-medium">전형유형</div>
                      <div>{selectedApplicant.admissionType}</div>
                      <div className="font-medium">총점</div>
                      <div>{selectedApplicant.score}점</div>
                      <div className="font-medium">순위</div>
                      <div>{selectedApplicant.rank}위</div>
                      <div className="font-medium">통보여부</div>
                      <div>{selectedApplicant.notified ? "완료" : "미통보"}</div>
                      <div className="font-medium">등록여부</div>
                      <div>{selectedApplicant.registered ? "등록완료" : "미등록"}</div>
                    </div>

                    {!selectedApplicant.notified && (
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>통보 필요</AlertTitle>
                        <AlertDescription>합격 통보가 아직 이루어지지 않았습니다.</AlertDescription>
                      </Alert>
                    )}

                    {!selectedApplicant.registered && selectedApplicant.notified && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>미등록</AlertTitle>
                        <AlertDescription>합격 통보는 완료되었으나 아직 등록이 이루어지지 않았습니다.</AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" onClick={() => setSelectedApplicant(null)}>
                      닫기
                    </Button>
                    <div className="flex gap-2">
                      {!selectedApplicant.notified && (
                        <Button size="sm">
                          <Send className="h-4 w-4 mr-2" />
                          합격 통보
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        합격증 출력
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* 합격자 발표·통보 화면 */}
        <TabsContent value="notification" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">합격자 발표·통보</h2>
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="발표 유형 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="initial">최초합격</SelectItem>
                  <SelectItem value="additional">추가합격</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>합격자 발표 일정</CardTitle>
                <CardDescription>합격자 발표 및 등록 일정을 관리합니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="initial-announcement">최초합격 발표일</Label>
                      <div className="flex gap-2">
                        <Input id="initial-announcement" type="date" defaultValue="2024-05-15" />
                        <Input type="time" defaultValue="10:00" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="initial-registration">최초합격 등록기간</Label>
                      <div className="flex gap-2 items-center">
                        <Input id="initial-registration" type="date" defaultValue="2024-05-16" />
                        <span>~</span>
                        <Input type="date" defaultValue="2024-05-19" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="additional-announcement">추가합격 발표일</Label>
                      <div className="flex gap-2">
                        <Input id="additional-announcement" type="date" defaultValue="2024-05-20" />
                        <Input type="time" defaultValue="10:00" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="additional-registration">추가합격 등록기간</Label>
                      <div className="flex gap-2 items-center">
                        <Input id="additional-registration" type="date" defaultValue="2024-05-21" />
                        <span>~</span>
                        <Input type="date" defaultValue="2024-05-22" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="announcement-method">발표 방법</Label>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="method-website" defaultChecked />
                        <Label htmlFor="method-website">입학처 홈페이지</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="method-sms" defaultChecked />
                        <Label htmlFor="method-sms">SMS 발송</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="method-email" defaultChecked />
                        <Label htmlFor="method-email">이메일 발송</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="method-post" />
                        <Label htmlFor="method-post">우편 발송</Label>
                      </div>
                    </div>
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
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>통보 템플릿 관리</CardTitle>
                    <CardDescription>합격자 통보에 사용할 메시지 템플릿을 관리합니다.</CardDescription>
                  </div>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    템플릿 추가
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>템플릿명</TableHead>
                      <TableHead>유형</TableHead>
                      <TableHead>대상</TableHead>
                      <TableHead>최근 사용일</TableHead>
                      <TableHead className="text-right">작업</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {NOTIFICATION_TEMPLATES.map((template) => (
                      <TableRow key={template.id}>
                        <TableCell className="font-medium">{template.name}</TableCell>
                        <TableCell>{template.type}</TableCell>
                        <TableCell>{template.target}</TableCell>
                        <TableCell>{template.lastUsed}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <PenLine className="h-4 w-4 mr-2" />
                                수정
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Send className="h-4 w-4 mr-2" />
                                발송
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="h-4 w-4 mr-2" />
                                미리보기
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>합격자 통보 실행</CardTitle>
              <CardDescription>합격자에게 통보 메시지를 발송합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="notification-type">통보 유형</Label>
                  <Select defaultValue="initial">
                    <SelectTrigger id="notification-type">
                      <SelectValue placeholder="통보 유형 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="initial">최초합격 통보</SelectItem>
                      <SelectItem value="additional">추가합격 통보</SelectItem>
                      <SelectItem value="registration">등록 안내</SelectItem>
                      <SelectItem value="deadline">등록 마감 안내</SelectItem>
                      <SelectItem value="orientation">합격자 오리엔테이션 안내</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notification-method">통보 방법</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="notification-method">
                      <SelectValue placeholder="통보 방법 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">SMS + 이메일</SelectItem>
                      <SelectItem value="sms">SMS만</SelectItem>
                      <SelectItem value="email">이메일만</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notification-target">통보 대상</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="notification-target">
                      <SelectValue placeholder="통보 대상 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체 합격자</SelectItem>
                      <SelectItem value="initial">최초합격자</SelectItem>
                      <SelectItem value="additional">추가합격자</SelectItem>
                      <SelectItem value="unregistered">미등록자</SelectItem>
                      <SelectItem value="registered">등록완료자</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notification-message">통보 메시지</Label>
                <div className="border rounded-md p-4 bg-muted/50">
                  <p>
                    [수원여자대학교 입학처] {"{"}이름{"}"} 님, 2024학년도 {"{"}모집단위{"}"} {"{"}전형유형{"}"} 전형에
                    최초합격하셨습니다. 합격을 축하드립니다. 등록기간: 2024.05.16 ~ 2024.05.19
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <h3 className="text-sm font-medium mb-2">통보 대상자 수</h3>
                <div className="text-2xl font-bold">1,150명</div>
                <p className="text-sm text-muted-foreground">최초합격자 전체</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                미리보기
              </Button>
              <Button>
                <Send className="h-4 w-4 mr-2" />
                통보 발송
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* 추가합격 관리 화면 */}
        <TabsContent value="additional-acceptance" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">추가합격 관리</h2>
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="모집단위 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체 모집단위</SelectItem>
                  <SelectItem value="computer">컴퓨터공학과</SelectItem>
                  <SelectItem value="electronic">전자공학과</SelectItem>
                  <SelectItem value="business">경영학과</SelectItem>
                  <SelectItem value="korean">국어국문학과</SelectItem>
                  <SelectItem value="chemistry">화학공학과</SelectItem>
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
                <CardTitle className="text-base font-medium">미등록 인원</CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-2xl font-bold text-red-500">95명</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base font-medium">추가합격 인원</CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-2xl font-bold text-amber-500">95명</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base font-medium">추가등록 인원</CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-2xl font-bold text-green-500">78명</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base font-medium">최종 등록률</CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-2xl font-bold">98.6%</div>
                <div className="text-sm text-muted-foreground">1,228명 / 1,245명</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>추가합격 대상자 관리</CardTitle>
                  <CardDescription>미등록 인원에 따른 추가합격 대상자를 관리합니다.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="department">
                    <TabsList className="mb-4">
                      <TabsTrigger value="department">모집단위별</TabsTrigger>
                      <TabsTrigger value="applicant">지원자별</TabsTrigger>
                    </TabsList>

                    <TabsContent value="department">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>모집단위</TableHead>
                            <TableHead>모집인원</TableHead>
                            <TableHead>최초합격</TableHead>
                            <TableHead>미등록</TableHead>
                            <TableHead>추가합격</TableHead>
                            <TableHead>추가등록</TableHead>
                            <TableHead>최종등록률</TableHead>
                            <TableHead className="text-right">작업</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {DEPARTMENTS.map((dept) => (
                            <TableRow key={dept.id}>
                              <TableCell className="font-medium">{dept.name}</TableCell>
                              <TableCell>{dept.quota}명</TableCell>
                              <TableCell>{dept.quota}명</TableCell>
                              <TableCell>{dept.accepted - dept.registered}명</TableCell>
                              <TableCell>{dept.accepted - dept.quota}명</TableCell>
                              <TableCell>{dept.registered - dept.quota}명</TableCell>
                              <TableCell>{dept.rate}%</TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm" className="h-8 px-2">
                                  상세보기
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TabsContent>

                    <TabsContent value="applicant">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                          <Input placeholder="지원자 검색" className="w-80" />
                          <Button variant="outline" size="icon">
                            <Search className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          추가합격 처리
                        </Button>
                      </div>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-12">
                              <Checkbox />
                            </TableHead>
                            <TableHead>수험번호</TableHead>
                            <TableHead>이름</TableHead>
                            <TableHead>모집단위</TableHead>
                            <TableHead>전형유형</TableHead>
                            <TableHead>순위</TableHead>
                            <TableHead>상태</TableHead>
                            <TableHead className="text-right">작업</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {ACCEPTED_APPLICANTS.filter((a) => a.status === "후보").map((applicant) => (
                            <TableRow key={applicant.id}>
                              <TableCell>
                                <Checkbox />
                              </TableCell>
                              <TableCell>{applicant.id}</TableCell>
                              <TableCell>{applicant.name}</TableCell>
                              <TableCell>{applicant.department}</TableCell>
                              <TableCell>{applicant.admissionType}</TableCell>
                              <TableCell>{applicant.rank}</TableCell>
                              <TableCell>
                                <Badge variant="outline">{applicant.status}</Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm" className="h-8 px-2">
                                  상세보기
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>추가합격 통보 현황</CardTitle>
                  <CardDescription>추가합격자 통보 및 등록 현황을 확인합니다.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>통보 완료</span>
                      <span className="text-sm">95명</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>등록 완료</span>
                      <span className="text-sm">78명 (82.1%)</span>
                    </div>
                    <Progress value={82.1} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>등록 포기</span>
                      <span className="text-sm">12명 (12.6%)</span>
                    </div>
                    <Progress value={12.6} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>미등록</span>
                      <span className="text-sm">5명 (5.3%)</span>
                    </div>
                    <Progress value={5.3} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    통계 다운로드
                  </Button>
                </CardFooter>
              </Card>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>추가합격 일정</CardTitle>
                  <CardDescription>추가합격 발표 및 등록 일정을 확인합니다.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">1차 추가합격 발표</p>
                      <p className="text-sm text-muted-foreground">2024-05-20 10:00</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">1차 추가합격 등록기간</p>
                      <p className="text-sm text-muted-foreground">2024-05-21 ~ 2024-05-22</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">2차 추가합격 발표</p>
                      <p className="text-sm text-muted-foreground">2024-05-23 10:00</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">2차 추가합격 등록기간</p>
                      <p className="text-sm text-muted-foreground">2024-05-24 ~ 2024-05-25</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">추가합격 최종마감</p>
                      <p className="text-sm text-muted-foreground">2024-05-26 18:00</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
