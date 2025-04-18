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
  AlertCircle,
  CheckCircle2,
  Download,
  FileText,
  Filter,
  MoreHorizontal,
  PenLine,
  Search,
  Upload,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// 샘플 데이터
const APPLICANTS_DATA = [
  {
    id: "2024-0001",
    name: "김지원",
    birth: "2005-05-15",
    highSchool: "서울고등학교",
    admissionType: "수시",
    department: "컴퓨터공학과",
    status: "검증완료",
    phone: "010-1234-5678",
    email: "kim@example.com",
  },
  {
    id: "2024-0002",
    name: "이수진",
    birth: "2005-03-22",
    highSchool: "부산고등학교",
    admissionType: "수시",
    department: "경영학과",
    status: "검증필요",
    phone: "010-2345-6789",
    email: "lee@example.com",
  },
  {
    id: "2024-0003",
    name: "박민수",
    birth: "2005-08-10",
    highSchool: "대전고등학교",
    admissionType: "수시",
    department: "전자공학과",
    status: "검증완료",
    phone: "010-3456-7890",
    email: "park@example.com",
  },
  {
    id: "2024-0004",
    name: "최영희",
    birth: "2005-11-27",
    highSchool: "광주고등학교",
    admissionType: "수시",
    department: "국어국문학과",
    status: "오류",
    phone: "010-4567-8901",
    email: "choi@example.com",
  },
  {
    id: "2024-0005",
    name: "정현우",
    birth: "2005-01-05",
    highSchool: "인천고등학교",
    admissionType: "수시",
    department: "화학공학과",
    status: "검증완료",
    phone: "010-5678-9012",
    email: "jung@example.com",
  },
]

const ERROR_TYPES = [
  { id: 1, type: "필수 정보 누락", count: 12 },
  { id: 2, type: "학생부 불일치", count: 8 },
  { id: 3, type: "지원자격 미달", count: 3 },
  { id: 4, type: "전형료 미납", count: 5 },
  { id: 5, type: "기타", count: 2 },
]

export default function AdmApplicationPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedApplicant, setSelectedApplicant] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("verification")

  // 검색 필터링된 지원자 목록
  const filteredApplicants = APPLICANTS_DATA.filter(
    (applicant) =>
      applicant.id.includes(searchTerm) ||
      applicant.name.includes(searchTerm) ||
      applicant.highSchool.includes(searchTerm) ||
      applicant.department.includes(searchTerm),
  )

  return (
    <div className="space-y-6">
      <Tabs defaultValue="verification" onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-3xl grid-cols-4">
          <TabsTrigger value="verification">
            <FileText className="h-4 w-4 mr-2" />
            원서 검증·보정
          </TabsTrigger>
          <TabsTrigger value="print">
            <FileText className="h-4 w-4 mr-2" />
            지원서 출력
          </TabsTrigger>
          <TabsTrigger value="upload">
            <Upload className="h-4 w-4 mr-2" />
            성적 업로드
          </TabsTrigger>
          <TabsTrigger value="search">
            <Search className="h-4 w-4 mr-2" />
            통합 조회
          </TabsTrigger>
        </TabsList>

        {/* 원서 검증·보정 화면 (ADM-SCR-001) */}
        <TabsContent value="verification" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">원서 접수 데이터 검증·보정</h2>
            <div className="flex items-center gap-2">
              <Input
                placeholder="지원자 검색 (수험번호, 이름, 학교, 학과)"
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
                  <DropdownMenuItem>검증 필요</DropdownMenuItem>
                  <DropdownMenuItem>오류 발생</DropdownMenuItem>
                  <DropdownMenuItem>검증 완료</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base font-medium">전체 지원자</CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-2xl font-bold">1,245</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base font-medium">검증 필요</CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-2xl font-bold text-amber-500">87</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base font-medium">오류 발생</CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-2xl font-bold text-red-500">30</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base font-medium">검증 완료</CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-2xl font-bold text-green-500">1,128</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader className="py-4">
                  <CardTitle>지원자 목록</CardTitle>
                  <CardDescription>원서 접수 데이터 검증 및 보정이 필요한 지원자 목록입니다.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>수험번호</TableHead>
                        <TableHead>이름</TableHead>
                        <TableHead>출신고교</TableHead>
                        <TableHead>지원학과</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead className="text-right">작업</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredApplicants.map((applicant) => (
                        <TableRow key={applicant.id}>
                          <TableCell>{applicant.id}</TableCell>
                          <TableCell>{applicant.name}</TableCell>
                          <TableCell>{applicant.highSchool}</TableCell>
                          <TableCell>{applicant.department}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                applicant.status === "검증완료"
                                  ? "default"
                                  : applicant.status === "오류"
                                    ? "destructive"
                                    : "outline"
                              }
                            >
                              {applicant.status}
                            </Badge>
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
                  <div className="text-sm text-muted-foreground">총 {filteredApplicants.length}명의 지원자</div>
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
                <CardHeader className="py-4">
                  <CardTitle>오류 유형별 현황</CardTitle>
                  <CardDescription>원서 접수 데이터의 오류 유형별 현황입니다.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {ERROR_TYPES.map((error) => (
                      <li key={error.id} className="flex justify-between items-center">
                        <div className="flex items-center">
                          <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                          <span>{error.type}</span>
                        </div>
                        <Badge variant="outline">{error.count}건</Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    오류 상세 보기
                  </Button>
                </CardFooter>
              </Card>

              {selectedApplicant && (
                <Card className="mt-4">
                  <CardHeader className="py-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{selectedApplicant.name}</CardTitle>
                        <CardDescription>수험번호: {selectedApplicant.id}</CardDescription>
                      </div>
                      <Badge
                        variant={
                          selectedApplicant.status === "검증완료"
                            ? "default"
                            : selectedApplicant.status === "오류"
                              ? "destructive"
                              : "outline"
                        }
                      >
                        {selectedApplicant.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="font-medium">생년월일</div>
                      <div>{selectedApplicant.birth}</div>
                      <div className="font-medium">출신고교</div>
                      <div>{selectedApplicant.highSchool}</div>
                      <div className="font-medium">전형유형</div>
                      <div>{selectedApplicant.admissionType}</div>
                      <div className="font-medium">지원학과</div>
                      <div>{selectedApplicant.department}</div>
                      <div className="font-medium">연락처</div>
                      <div>{selectedApplicant.phone}</div>
                      <div className="font-medium">이메일</div>
                      <div>{selectedApplicant.email}</div>
                    </div>

                    {selectedApplicant.status === "오류" && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>오류 발생</AlertTitle>
                        <AlertDescription>
                          학생부 정보와 입력된 출신고교 정보가 일치하지 않습니다. 확인 후 수정이 필요합니다.
                        </AlertDescription>
                      </Alert>
                    )}

                    {selectedApplicant.status === "검증필요" && (
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>검증 필요</AlertTitle>
                        <AlertDescription>
                          원서 접수 데이터의 검증이 필요합니다. 정보를 확인하고 검증을 완료해주세요.
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" onClick={() => setSelectedApplicant(null)}>
                      닫기
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        원서 보기
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm">
                            <PenLine className="h-4 w-4 mr-2" />
                            정보 수정
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>지원자 정보 수정</DialogTitle>
                            <DialogDescription>
                              {selectedApplicant.name} ({selectedApplicant.id}) 지원자의 정보를 수정합니다.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor="name">이름</Label>
                                <Input id="name" defaultValue={selectedApplicant.name} />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="birth">생년월일</Label>
                                <Input id="birth" defaultValue={selectedApplicant.birth} />
                              </div>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="highSchool">출신고교</Label>
                              <Input id="highSchool" defaultValue={selectedApplicant.highSchool} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor="phone">연락처</Label>
                                <Input id="phone" defaultValue={selectedApplicant.phone} />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="email">이메일</Label>
                                <Input id="email" defaultValue={selectedApplicant.email} />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor="admissionType">전형유형</Label>
                                <Select defaultValue={selectedApplicant.admissionType}>
                                  <SelectTrigger id="admissionType">
                                    <SelectValue placeholder="전형유형 선택" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="수시">수시</SelectItem>
                                    <SelectItem value="정시">정시</SelectItem>
                                    <SelectItem value="편입학">편입학</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="department">지원학과</Label>
                                <Select defaultValue={selectedApplicant.department}>
                                  <SelectTrigger id="department">
                                    <SelectValue placeholder="지원학과 선택" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="컴퓨터공학과">컴퓨터공학과</SelectItem>
                                    <SelectItem value="전자공학과">전자공학과</SelectItem>
                                    <SelectItem value="경영학과">경영학과</SelectItem>
                                    <SelectItem value="국어국문학과">국어국문학과</SelectItem>
                                    <SelectItem value="화학공학과">화학공학과</SelectItem>
                                  </SelectContent>
                                </Select>
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
                  </CardFooter>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* 지원서 출력 화면 (ADM-SCR-002) */}
        <TabsContent value="print" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">지원서 출력</h2>
            <div className="flex items-center gap-2">
              <Input placeholder="지원자 검색" className="w-80" />
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
                  <DropdownMenuItem>수시 지원자</DropdownMenuItem>
                  <DropdownMenuItem>정시 지원자</DropdownMenuItem>
                  <DropdownMenuItem>편입학 지원자</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader className="py-4">
                  <CardTitle>지원자 목록</CardTitle>
                  <CardDescription>지원서를 출력할 지원자를 선택하세요.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <div className="flex items-center">
                            <input type="checkbox" className="h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead>수험번호</TableHead>
                        <TableHead>이름</TableHead>
                        <TableHead>출신고교</TableHead>
                        <TableHead>전형유형</TableHead>
                        <TableHead>지원학과</TableHead>
                        <TableHead className="text-right">작업</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {APPLICANTS_DATA.map((applicant) => (
                        <TableRow key={applicant.id}>
                          <TableCell>
                            <div className="flex items-center">
                              <input type="checkbox" className="h-4 w-4" />
                            </div>
                          </TableCell>
                          <TableCell>{applicant.id}</TableCell>
                          <TableCell>{applicant.name}</TableCell>
                          <TableCell>{applicant.highSchool}</TableCell>
                          <TableCell>{applicant.admissionType}</TableCell>
                          <TableCell>{applicant.department}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <FileText className="h-4 w-4 mr-2" />
                              출력
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">총 {APPLICANTS_DATA.length}명의 지원자</div>
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
                <CardHeader className="py-4">
                  <CardTitle>출력 옵션</CardTitle>
                  <CardDescription>지원서 출력 형식과 옵션을 선택하세요.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="print-type">출력 형식</Label>
                    <Select defaultValue="application">
                      <SelectTrigger id="print-type">
                        <SelectValue placeholder="출력 형식 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="application">지원서</SelectItem>
                        <SelectItem value="receipt">접수증</SelectItem>
                        <SelectItem value="envelope">우편봉투</SelectItem>
                        <SelectItem value="list">지원자 목록</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="print-option">출력 옵션</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="print-option">
                        <SelectValue placeholder="출력 옵션 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">전체 정보</SelectItem>
                        <SelectItem value="basic">기본 정보만</SelectItem>
                        <SelectItem value="custom">사용자 정의</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="print-format">파일 형식</Label>
                    <Select defaultValue="pdf">
                      <SelectTrigger id="print-format">
                        <SelectValue placeholder="파일 형식 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="hwp">한글(HWP)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-2">
                    <Label className="flex items-center gap-2 mb-4">
                      <input type="checkbox" className="h-4 w-4" />
                      개인정보 마스킹 처리
                    </Label>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Button className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    선택 지원자 출력
                  </Button>
                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    전체 지원자 출력
                  </Button>
                </CardFooter>
              </Card>

              <Card className="mt-4">
                <CardHeader className="py-4">
                  <CardTitle>최근 출력 기록</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>지원서_2024수시_컴퓨터공학과.pdf</span>
                      <span className="text-muted-foreground">오늘 10:23</span>
                    </li>
                    <li className="flex justify-between">
                      <span>접수증_2024정시_전체.pdf</span>
                      <span className="text-muted-foreground">어제 16:45</span>
                    </li>
                    <li className="flex justify-between">
                      <span>지원자목록_2024수시_전체.xlsx</span>
                      <span className="text-muted-foreground">2024-05-10</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* 학생부·수능 데이터 업로드·다운로드 화면 (ADM-SCR-003) */}
        <TabsContent value="upload" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">학생부·수능 데이터 업로드·다운로드</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>학생부 데이터 관리</CardTitle>
                <CardDescription>NEIS 등 외부 시스템의 학생부 데이터를 업로드하거나 다운로드합니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="school-record-file">학생부 파일 업로드</Label>
                  <div className="flex gap-2">
                    <Input id="school-record-file" type="file" />
                    <Button>업로드</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    지원한 NEIS 학생부 데이터 파일(.xlsx, .csv)을 업로드하세요.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>학생부 데이터 다운로드</Label>
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="다운로드 범위 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">전체 지원자</SelectItem>
                        <SelectItem value="early">수시 지원자</SelectItem>
                        <SelectItem value="regular">정시 지원자</SelectItem>
                        <SelectItem value="transfer">편입학 지원자</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      다운로드
                    </Button>
                  </div>
                </div>

                <div className="pt-2">
                  <h3 className="text-sm font-medium mb-2">최근 업로드 기록</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>파일명</TableHead>
                        <TableHead>업로드 일시</TableHead>
                        <TableHead>상태</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>학생부_2024수시_1차.xlsx</TableCell>
                        <TableCell>2024-05-15 14:30</TableCell>
                        <TableCell>
                          <Badge>완료</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>학생부_2024수시_2차.xlsx</TableCell>
                        <TableCell>2024-05-10 11:15</TableCell>
                        <TableCell>
                          <Badge>완료</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>수능 데이터 관리</CardTitle>
                <CardDescription>
                  평가원 등 외부 시스템의 수능 성적 데이터를 업로드하거나 다운로드합니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="csat-file">수능 성적 파일 업로드</Label>
                  <div className="flex gap-2">
                    <Input id="csat-file" type="file" />
                    <Button>업로드</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    평가원에서 제공받은 수능 성적 데이터 파일(.xlsx, .csv)을 업로드하세요.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>수능 데이터 다운로드</Label>
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="다운로드 범위 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">전체 지원자</SelectItem>
                        <SelectItem value="early">수시 지원자</SelectItem>
                        <SelectItem value="regular">정시 지원자</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      다운로드
                    </Button>
                  </div>
                </div>

                <div className="pt-2">
                  <h3 className="text-sm font-medium mb-2">최근 업로드 기록</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>파일명</TableHead>
                        <TableHead>업로드 일시</TableHead>
                        <TableHead>상태</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>수능성적_2024정시.xlsx</TableCell>
                        <TableCell>2024-01-05 09:45</TableCell>
                        <TableCell>
                          <Badge>완료</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>수능성적_2024수시_최저.xlsx</TableCell>
                        <TableCell>2023-12-28 13:20</TableCell>
                        <TableCell>
                          <Badge>완료</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>데이터 검증 결과</CardTitle>
              <CardDescription>업로드된 데이터의 검증 결과를 확인합니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="py-4">
                    <CardTitle className="text-base font-medium">전체 데이터</CardTitle>
                  </CardHeader>
                  <CardContent className="py-0">
                    <div className="text-2xl font-bold">1,245</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="py-4">
                    <CardTitle className="text-base font-medium">매칭 성공</CardTitle>
                  </CardHeader>
                  <CardContent className="py-0">
                    <div className="text-2xl font-bold text-green-500">1,230</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="py-4">
                    <CardTitle className="text-base font-medium">매칭 실패</CardTitle>
                  </CardHeader>
                  <CardContent className="py-0">
                    <div className="text-2xl font-bold text-red-500">15</div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">매칭 실패 목록</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>수험번호</TableHead>
                      <TableHead>이름</TableHead>
                      <TableHead>실패 사유</TableHead>
                      <TableHead className="text-right">작업</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>2024-0012</TableCell>
                      <TableCell>홍길동</TableCell>
                      <TableCell>주민등록번호 불일치</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          수정
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2024-0034</TableCell>
                      <TableCell>김철수</TableCell>
                      <TableCell>이름 불일치</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          수정
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2024-0056</TableCell>
                      <TableCell>이영희</TableCell>
                      <TableCell>수험번호 없음</TableCell>
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
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                오류 목록 다운로드
              </Button>
              <Button>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                일괄 처리
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* 지원자 통합 조회 화면 (ADM-SCR-004) */}
        <TabsContent value="search" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">지원자 통합 조회</h2>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>검색 조건</CardTitle>
              <CardDescription>다양한 조건으로 지원자 정보를 검색할 수 있습니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="admission-year">모집 연도</Label>
                  <Select defaultValue="2024">
                    <SelectTrigger id="admission-year">
                      <SelectValue placeholder="모집 연도 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024학년도</SelectItem>
                      <SelectItem value="2023">2023학년도</SelectItem>
                      <SelectItem value="2022">2022학년도</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admission-type">모집 시기</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="admission-type">
                      <SelectValue placeholder="모집 시기 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="early">수시모집</SelectItem>
                      <SelectItem value="regular">정시모집</SelectItem>
                      <SelectItem value="transfer">편입학</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admission-round">전형 유형</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="admission-round">
                      <SelectValue placeholder="전형 유형 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="comprehensive">학생부종합</SelectItem>
                      <SelectItem value="subject">학생부교과</SelectItem>
                      <SelectItem value="csat">수능위주</SelectItem>
                      <SelectItem value="practical">실기위주</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="college">단과대학</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="college">
                      <SelectValue placeholder="단과대학 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="humanities">인문대학</SelectItem>
                      <SelectItem value="social">사회과학대학</SelectItem>
                      <SelectItem value="business">경영대학</SelectItem>
                      <SelectItem value="engineering">공과대학</SelectItem>
                      <SelectItem value="natural">자연과학대학</SelectItem>
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

                <div className="space-y-2">
                  <Label htmlFor="status">지원 상태</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="status">
                      <SelectValue placeholder="지원 상태 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="applied">원서접수</SelectItem>
                      <SelectItem value="document">서류평가</SelectItem>
                      <SelectItem value="interview">면접대상</SelectItem>
                      <SelectItem value="accepted">합격</SelectItem>
                      <SelectItem value="rejected">불합격</SelectItem>
                      <SelectItem value="registered">등록</SelectItem>
                      <SelectItem value="canceled">등록포기</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="keyword-type">키워드 유형</Label>
                  <Select defaultValue="name">
                    <SelectTrigger id="keyword-type">
                      <SelectValue placeholder="키워드 유형 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">이름</SelectItem>
                      <SelectItem value="id">수험번호</SelectItem>
                      <SelectItem value="school">출신고교</SelectItem>
                      <SelectItem value="phone">연락처</SelectItem>
                      <SelectItem value="address">주소</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keyword">검색어</Label>
                  <div className="flex gap-2">
                    <Input id="keyword" placeholder="검색어를 입력하세요" />
                    <Button>
                      <Search className="h-4 w-4 mr-2" />
                      검색
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>검색 결과</CardTitle>
                  <CardDescription>검색 조건에 맞는 지원자 목록입니다.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    엑셀 다운로드
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    출력
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
                    <TableHead>출신고교</TableHead>
                    <TableHead>모집시기</TableHead>
                    <TableHead>전형유형</TableHead>
                    <TableHead>모집단위</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead className="text-right">작업</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {APPLICANTS_DATA.map((applicant) => (
                    <TableRow key={applicant.id}>
                      <TableCell>{applicant.id}</TableCell>
                      <TableCell>{applicant.name}</TableCell>
                      <TableCell>{applicant.highSchool}</TableCell>
                      <TableCell>{applicant.admissionType}</TableCell>
                      <TableCell>학생부종합</TableCell>
                      <TableCell>{applicant.department}</TableCell>
                      <TableCell>
                        <Badge variant="outline">원서접수</Badge>
                      </TableCell>
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
                              상세 정보
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <PenLine className="h-4 w-4 mr-2" />
                              정보 수정
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="h-4 w-4 mr-2" />
                              지원서 출력
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
              <div className="text-sm text-muted-foreground">총 {APPLICANTS_DATA.length}명의 지원자</div>
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
