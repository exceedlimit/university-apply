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
  BanknoteIcon,
  BarChart3,
  CheckCircle2,
  CreditCard,
  Download,
  FileText,
  Filter,
  Printer,
  Receipt,
  Search,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// 샘플 데이터
const REGISTRATION_DATA = [
  {
    id: "2024-0001",
    name: "김지원",
    department: "컴퓨터공학과",
    admissionType: "수시",
    tuition: 4200000,
    admissionFee: 300000,
    total: 4500000,
    status: "등록완료",
    paymentDate: "2024-05-17",
    paymentMethod: "카드",
    receiptIssued: true,
  },
  {
    id: "2024-0002",
    name: "이수진",
    department: "경영학과",
    admissionType: "수시",
    tuition: 3800000,
    admissionFee: 300000,
    total: 4100000,
    status: "미등록",
    paymentDate: null,
    paymentMethod: null,
    receiptIssued: false,
  },
  {
    id: "2024-0003",
    name: "박민수",
    department: "전자공학과",
    admissionType: "수시",
    tuition: 4200000,
    admissionFee: 300000,
    total: 4500000,
    status: "등록완료",
    paymentDate: "2024-05-16",
    paymentMethod: "계좌이체",
    receiptIssued: true,
  },
  {
    id: "2024-0004",
    name: "최영희",
    department: "국어국문학과",
    admissionType: "수시",
    tuition: 3600000,
    admissionFee: 300000,
    total: 3900000,
    status: "미등록",
    paymentDate: null,
    paymentMethod: null,
    receiptIssued: false,
  },
  {
    id: "2024-0005",
    name: "정현우",
    department: "화학공학과",
    admissionType: "수시",
    tuition: 4200000,
    admissionFee: 300000,
    total: 4500000,
    status: "등록완료",
    paymentDate: "2024-05-18",
    paymentMethod: "계좌이체",
    receiptIssued: true,
  },
  {
    id: "2024-0006",
    name: "한미영",
    department: "컴퓨터공학과",
    admissionType: "수시",
    tuition: 4200000,
    admissionFee: 300000,
    total: 4500000,
    status: "환불완료",
    paymentDate: "2024-05-17",
    paymentMethod: "카드",
    receiptIssued: true,
    refundDate: "2024-05-20",
    refundAmount: 4500000,
  },
]

const DEPARTMENTS = [
  { id: 1, name: "컴퓨터공학과", tuition: 4200000, admissionFee: 300000 },
  { id: 2, name: "전자공학과", tuition: 4200000, admissionFee: 300000 },
  { id: 3, name: "경영학과", tuition: 3800000, admissionFee: 300000 },
  { id: 4, name: "국어국문학과", tuition: 3600000, admissionFee: 300000 },
  { id: 5, name: "화학공학과", tuition: 4200000, admissionFee: 300000 },
]

const BANKS = [
  { id: 1, name: "국민은행", account: "123-45-6789", holder: "수원여자대학교" },
  { id: 2, name: "신한은행", account: "987-65-4321", holder: "수원여자대학교" },
  { id: 3, name: "우리은행", account: "111-22-3333", holder: "수원여자대학교" },
]

export default function RegistrationPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<any>(null)

  // 검색 필터링된 등록 데이터
  const filteredRegistrations = REGISTRATION_DATA.filter(
    (registration) =>
      registration.id.includes(searchTerm) ||
      registration.name.includes(searchTerm) ||
      registration.department.includes(searchTerm) ||
      registration.status.includes(searchTerm),
  )

  // 등록 통계 계산
  const totalStudents = REGISTRATION_DATA.length
  const registeredStudents = REGISTRATION_DATA.filter((r) => r.status === "등록완료").length
  const unregisteredStudents = REGISTRATION_DATA.filter((r) => r.status === "미등록").length
  const refundedStudents = REGISTRATION_DATA.filter((r) => r.status === "환불완료").length
  const registrationRate = (registeredStudents / totalStudents) * 100

  // 총 등록금액 계산
  const totalAmount = REGISTRATION_DATA.reduce((sum, r) => {
    if (r.status === "등록완료") {
      return sum + r.total
    }
    return sum
  }, 0)

  return (
    <div className="space-y-6">
      <Tabs defaultValue="tuition-management">
        <TabsList className="grid w-full max-w-3xl grid-cols-3">
          <TabsTrigger value="tuition-management">
            <BanknoteIcon className="h-4 w-4 mr-2" />
            등록금 관리
          </TabsTrigger>
          <TabsTrigger value="receipt-management">
            <Receipt className="h-4 w-4 mr-2" />
            고지서·영수증 관리
          </TabsTrigger>
          <TabsTrigger value="refund-management">
            <CreditCard className="h-4 w-4 mr-2" />
            환불 관리
          </TabsTrigger>
        </TabsList>

        {/* 등록금 관리 화면 */}
        <TabsContent value="tuition-management" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">등록금 관리</h2>
            <div className="flex items-center gap-2">
              <Input
                placeholder="학생 검색 (수험번호, 이름, 학과)"
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
                  <DropdownMenuItem>전체 학생</DropdownMenuItem>
                  <DropdownMenuItem>등록완료</DropdownMenuItem>
                  <DropdownMenuItem>미등록</DropdownMenuItem>
                  <DropdownMenuItem>환불완료</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base font-medium">전체 학생</CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-2xl font-bold">{totalStudents}명</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base font-medium">등록완료</CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-2xl font-bold text-green-500">{registeredStudents}명</div>
                <div className="text-sm text-muted-foreground">{registrationRate.toFixed(1)}%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base font-medium">미등록</CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-2xl font-bold text-amber-500">{unregisteredStudents}명</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base font-medium">총 등록금액</CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-2xl font-bold">{totalAmount.toLocaleString()}원</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>등록금 납부 현황</CardTitle>
                  <CardDescription>학생별 등록금 납부 현황을 확인합니다.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>수험번호</TableHead>
                        <TableHead>이름</TableHead>
                        <TableHead>모집단위</TableHead>
                        <TableHead>등록금</TableHead>
                        <TableHead>납부일</TableHead>
                        <TableHead>납부방법</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead className="text-right">작업</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRegistrations.map((registration) => (
                        <TableRow key={registration.id}>
                          <TableCell>{registration.id}</TableCell>
                          <TableCell>{registration.name}</TableCell>
                          <TableCell>{registration.department}</TableCell>
                          <TableCell>{registration.total.toLocaleString()}원</TableCell>
                          <TableCell>{registration.paymentDate || "-"}</TableCell>
                          <TableCell>{registration.paymentMethod || "-"}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                registration.status === "등록완료"
                                  ? "default"
                                  : registration.status === "환불완료"
                                    ? "destructive"
                                    : "outline"
                              }
                            >
                              {registration.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedStudent(registration)}
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
                  <div className="text-sm text-muted-foreground">총 {filteredRegistrations.length}명</div>
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
                  <CardTitle>등록금 설정</CardTitle>
                  <CardDescription>모집단위별 등록금을 설정합니다.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="academic-year">학년도</Label>
                    <Select defaultValue="2024">
                      <SelectTrigger id="academic-year">
                        <SelectValue placeholder="학년도 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">2024학년도</SelectItem>
                        <SelectItem value="2023">2023학년도</SelectItem>
                        <SelectItem value="2022">2022학년도</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="semester">학기</Label>
                    <Select defaultValue="1">
                      <SelectTrigger id="semester">
                        <SelectValue placeholder="학기 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1학기</SelectItem>
                        <SelectItem value="2">2학기</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-2">
                    <h3 className="text-sm font-medium mb-2">모집단위별 등록금</h3>
                    <div className="space-y-4">
                      {DEPARTMENTS.map((dept) => (
                        <div key={dept.id} className="grid grid-cols-2 gap-2 text-sm">
                          <div className="font-medium">{dept.name}</div>
                          <div className="text-right">{dept.tuition.toLocaleString()}원</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <h3 className="text-sm font-medium mb-2">입학금</h3>
                    <div className="text-right font-medium">{DEPARTMENTS[0].admissionFee.toLocaleString()}원</div>
                    <p className="text-xs text-muted-foreground mt-1">모든 모집단위 공통</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline">초기화</Button>
                  <Button>저장</Button>
                </CardFooter>
              </Card>

              {selectedStudent && (
                <Card className="mt-4">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{selectedStudent.name}</CardTitle>
                        <CardDescription>수험번호: {selectedStudent.id}</CardDescription>
                      </div>
                      <Badge
                        variant={
                          selectedStudent.status === "등록완료"
                            ? "default"
                            : selectedStudent.status === "환불완료"
                              ? "destructive"
                              : "outline"
                        }
                      >
                        {selectedStudent.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="font-medium">모집단위</div>
                      <div>{selectedStudent.department}</div>
                      <div className="font-medium">전형유형</div>
                      <div>{selectedStudent.admissionType}</div>
                      <div className="font-medium">등록금</div>
                      <div>{selectedStudent.tuition.toLocaleString()}원</div>
                      <div className="font-medium">입학금</div>
                      <div>{selectedStudent.admissionFee.toLocaleString()}원</div>
                      <div className="font-medium">총액</div>
                      <div className="font-bold">{selectedStudent.total.toLocaleString()}원</div>
                      {selectedStudent.status !== "미등록" && (
                        <>
                          <div className="font-medium">납부일</div>
                          <div>{selectedStudent.paymentDate}</div>
                          <div className="font-medium">납부방법</div>
                          <div>{selectedStudent.paymentMethod}</div>
                          <div className="font-medium">영수증 발급</div>
                          <div>{selectedStudent.receiptIssued ? "발급완료" : "미발급"}</div>
                        </>
                      )}
                      {selectedStudent.status === "환불완료" && (
                        <>
                          <div className="font-medium">환불일</div>
                          <div>{selectedStudent.refundDate}</div>
                          <div className="font-medium">환불금액</div>
                          <div>{selectedStudent.refundAmount.toLocaleString()}원</div>
                        </>
                      )}
                    </div>

                    {selectedStudent.status === "미등록" && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>미등록</AlertTitle>
                        <AlertDescription>아직 등록금이 납부되지 않았습니다.</AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" onClick={() => setSelectedStudent(null)}>
                      닫기
                    </Button>
                    <div className="flex gap-2">
                      {selectedStudent.status === "미등록" && (
                        <Button size="sm">
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          납부 처리
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Printer className="h-4 w-4 mr-2" />
                        고지서 출력
                      </Button>
                      {selectedStudent.status === "등록완료" && (
                        <Button variant="outline" size="sm">
                          <Receipt className="h-4 w-4 mr-2" />
                          영수증 출력
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* 고지서·영수증 관리 화면 */}
        <TabsContent value="receipt-management" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">고지서·영수증 관리</h2>
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="문서 유형 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="bill">등록금 고지서</SelectItem>
                  <SelectItem value="receipt">등록금 영수증</SelectItem>
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
                <CardTitle>등록금 고지서 관리</CardTitle>
                <CardDescription>등록금 고지서 양식 및 발급 관리를 합니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bill-academic-year">학년도</Label>
                      <Select defaultValue="2024">
                        <SelectTrigger id="bill-academic-year">
                          <SelectValue placeholder="학년도 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2024">2024학년도</SelectItem>
                          <SelectItem value="2023">2023학년도</SelectItem>
                          <SelectItem value="2022">2022학년도</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bill-semester">학기</Label>
                      <Select defaultValue="1">
                        <SelectTrigger id="bill-semester">
                          <SelectValue placeholder="학기 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1학기</SelectItem>
                          <SelectItem value="2">2학기</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bill-template">고지서 양식</Label>
                    <Select defaultValue="default">
                      <SelectTrigger id="bill-template">
                        <SelectValue placeholder="고지서 양식 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">기본 양식</SelectItem>
                        <SelectItem value="custom1">맞춤 양식 1</SelectItem>
                        <SelectItem value="custom2">맞춤 양식 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-2">
                    <h3 className="text-sm font-medium mb-2">납부 계좌 정보</h3>
                    <div className="space-y-2">
                      {BANKS.map((bank) => (
                        <div key={bank.id} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id={`bank-${bank.id}`}
                            name="bank"
                            className="h-4 w-4"
                            defaultChecked={bank.id === 1}
                          />
                          <Label htmlFor={`bank-${bank.id}`}>
                            {bank.name} {bank.account} ({bank.holder})
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bill-due-date">납부 기한</Label>
                    <Input id="bill-due-date" type="date" defaultValue="2024-05-19" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bill-note">비고</Label>
                    <Input id="bill-note" defaultValue="기한 내 미납 시 합격이 취소될 수 있습니다." />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  미리보기
                </Button>
                <Button>
                  <Printer className="h-4 w-4 mr-2" />
                  일괄 출력
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>등록금 영수증 관리</CardTitle>
                <CardDescription>등록금 영수증 양식 및 발급 관리를 합니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="receipt-academic-year">학년도</Label>
                      <Select defaultValue="2024">
                        <SelectTrigger id="receipt-academic-year">
                          <SelectValue placeholder="학년도 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2024">2024학년도</SelectItem>
                          <SelectItem value="2023">2023학년도</SelectItem>
                          <SelectItem value="2022">2022학년도</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="receipt-semester">학기</Label>
                      <Select defaultValue="1">
                        <SelectTrigger id="receipt-semester">
                          <SelectValue placeholder="학기 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1학기</SelectItem>
                          <SelectItem value="2">2학기</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="receipt-template">영수증 양식</Label>
                    <Select defaultValue="default">
                      <SelectTrigger id="receipt-template">
                        <SelectValue placeholder="영수증 양식 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">기본 양식</SelectItem>
                        <SelectItem value="tax">세금계산서 양식</SelectItem>
                        <SelectItem value="custom">맞춤 양식</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="receipt-issuer">발급자</Label>
                    <Input id="receipt-issuer" defaultValue="수원여자대학교 재무처" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="receipt-stamp">직인 사용</Label>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="use-stamp" className="h-4 w-4" defaultChecked />
                      <Label htmlFor="use-stamp">직인 이미지 포함</Label>
                    </div>
                  </div>

                  <div className="pt-2">
                    <h3 className="text-sm font-medium mb-2">발급 대상</h3>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="target-all" name="target" className="h-4 w-4" defaultChecked />
                      <Label htmlFor="target-all">등록완료자 전체</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="target-selected" name="target" className="h-4 w-4" />
                      <Label htmlFor="target-selected">선택한 학생만</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  미리보기
                </Button>
                <Button>
                  <Printer className="h-4 w-4 mr-2" />
                  일괄 출력
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>발급 이력 관리</CardTitle>
              <CardDescription>고지서 및 영수증 발급 이력을 관리합니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="bill-history">
                <TabsList className="mb-4">
                  <TabsTrigger value="bill-history">고지서 발급 이력</TabsTrigger>
                  <TabsTrigger value="receipt-history">영수증 발급 이력</TabsTrigger>
                </TabsList>

                <TabsContent value="bill-history">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <Input placeholder="학생 검색" className="w-80" />
                      <Button variant="outline" size="icon">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      엑셀 다운로드
                    </Button>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>수험번호</TableHead>
                        <TableHead>이름</TableHead>
                        <TableHead>모집단위</TableHead>
                        <TableHead>발급일시</TableHead>
                        <TableHead>발급방법</TableHead>
                        <TableHead>발급자</TableHead>
                        <TableHead className="text-right">작업</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>2024-0001</TableCell>
                        <TableCell>김지원</TableCell>
                        <TableCell>컴퓨터공학과</TableCell>
                        <TableCell>2024-05-15 14:30</TableCell>
                        <TableCell>시스템</TableCell>
                        <TableCell>관리자</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            <Printer className="h-4 w-4 mr-2" />
                            재출력
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2024-0002</TableCell>
                        <TableCell>이수진</TableCell>
                        <TableCell>경영학과</TableCell>
                        <TableCell>2024-05-15 14:32</TableCell>
                        <TableCell>시스템</TableCell>
                        <TableCell>관리자</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            <Printer className="h-4 w-4 mr-2" />
                            재출력
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="receipt-history">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <Input placeholder="학생 검색" className="w-80" />
                      <Button variant="outline" size="icon">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      엑셀 다운로드
                    </Button>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>수험번호</TableHead>
                        <TableHead>이름</TableHead>
                        <TableHead>모집단위</TableHead>
                        <TableHead>발급일시</TableHead>
                        <TableHead>발급방법</TableHead>
                        <TableHead>발급자</TableHead>
                        <TableHead className="text-right">작업</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>2024-0001</TableCell>
                        <TableCell>김지원</TableCell>
                        <TableCell>컴퓨터공학과</TableCell>
                        <TableCell>2024-05-17 16:45</TableCell>
                        <TableCell>시스템</TableCell>
                        <TableCell>관리자</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            <Printer className="h-4 w-4 mr-2" />
                            재출력
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2024-0003</TableCell>
                        <TableCell>박민수</TableCell>
                        <TableCell>전자공학과</TableCell>
                        <TableCell>2024-05-16 11:20</TableCell>
                        <TableCell>시스템</TableCell>
                        <TableCell>관리자</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            <Printer className="h-4 w-4 mr-2" />
                            재출력
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 환불 관리 화면 */}
        <TabsContent value="refund-management" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">환불 관리</h2>
            <div className="flex items-center gap-2">
              <Input placeholder="학생 검색" className="w-80" />
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base font-medium">등록완료</CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-2xl font-bold text-green-500">{registeredStudents}명</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base font-medium">환불신청</CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-2xl font-bold text-amber-500">0명</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base font-medium">환불완료</CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-2xl font-bold text-red-500">{refundedStudents}명</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base font-medium">환불금액</CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-2xl font-bold">
                  {REGISTRATION_DATA.reduce((sum, r) => {
                    if (r.status === "환불완료" && r.refundAmount) {
                      return sum + r.refundAmount
                    }
                    return sum
                  }, 0).toLocaleString()}
                  원
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>환불 신청 및 처리 현황</CardTitle>
                  <CardDescription>등록금 환불 신청 및 처리 현황을 관리합니다.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="registered">
                    <TabsList className="mb-4">
                      <TabsTrigger value="registered">등록완료 학생</TabsTrigger>
                      <TabsTrigger value="refunded">환불완료 학생</TabsTrigger>
                    </TabsList>

                    <TabsContent value="registered">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>수험번호</TableHead>
                            <TableHead>이름</TableHead>
                            <TableHead>모집단위</TableHead>
                            <TableHead>등록금</TableHead>
                            <TableHead>납부일</TableHead>
                            <TableHead>납부방법</TableHead>
                            <TableHead className="text-right">작업</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {REGISTRATION_DATA.filter((r) => r.status === "등록완료").map((registration) => (
                            <TableRow key={registration.id}>
                              <TableCell>{registration.id}</TableCell>
                              <TableCell>{registration.name}</TableCell>
                              <TableCell>{registration.department}</TableCell>
                              <TableCell>{registration.total.toLocaleString()}원</TableCell>
                              <TableCell>{registration.paymentDate}</TableCell>
                              <TableCell>{registration.paymentMethod}</TableCell>
                              <TableCell className="text-right">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 px-2">
                                      환불 처리
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>등록금 환불 처리</DialogTitle>
                                      <DialogDescription>
                                        {registration.name} ({registration.id}) 학생의 등록금 환불을 처리합니다.
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                          <Label htmlFor="refund-date">환불일</Label>
                                          <Input id="refund-date" type="date" />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="refund-amount">환불금액</Label>
                                          <Input id="refund-amount" type="number" defaultValue={registration.total} />
                                        </div>
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="refund-reason">환불사유</Label>
                                        <Select defaultValue="admission">
                                          <SelectTrigger id="refund-reason">
                                            <SelectValue placeholder="환불사유 선택" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="admission">타 대학 합격</SelectItem>
                                            <SelectItem value="personal">개인 사정</SelectItem>
                                            <SelectItem value="military">군입대</SelectItem>
                                            <SelectItem value="other">기타</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="refund-account">환불계좌</Label>
                                        <div className="grid grid-cols-3 gap-2">
                                          <Select defaultValue="kb">
                                            <SelectTrigger>
                                              <SelectValue placeholder="은행 선택" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="kb">국민은행</SelectItem>
                                              <SelectItem value="shinhan">신한은행</SelectItem>
                                              <SelectItem value="woori">우리은행</SelectItem>
                                              <SelectItem value="hana">하나은행</SelectItem>
                                            </SelectContent>
                                          </Select>
                                          <Input placeholder="계좌번호" className="col-span-2" />
                                        </div>
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="refund-note">비고</Label>
                                        <Input id="refund-note" />
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <Button variant="outline">취소</Button>
                                      <Button>환불 처리</Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TabsContent>

                    <TabsContent value="refunded">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>수험번호</TableHead>
                            <TableHead>이름</TableHead>
                            <TableHead>모집단위</TableHead>
                            <TableHead>환불금액</TableHead>
                            <TableHead>환불일</TableHead>
                            <TableHead>상태</TableHead>
                            <TableHead className="text-right">작업</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {REGISTRATION_DATA.filter((r) => r.status === "환불완료").map((registration) => (
                            <TableRow key={registration.id}>
                              <TableCell>{registration.id}</TableCell>
                              <TableCell>{registration.name}</TableCell>
                              <TableCell>{registration.department}</TableCell>
                              <TableCell>{registration.refundAmount?.toLocaleString()}원</TableCell>
                              <TableCell>{registration.refundDate}</TableCell>
                              <TableCell>
                                <Badge variant="destructive">{registration.status}</Badge>
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
                  <CardTitle>환불 규정 설정</CardTitle>
                  <CardDescription>등록금 환불 규정을 설정합니다.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="refund-policy">환불 규정</Label>
                    <Select defaultValue="default">
                      <SelectTrigger id="refund-policy">
                        <SelectValue placeholder="환불 규정 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">기본 규정</SelectItem>
                        <SelectItem value="custom">맞춤 규정</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-2">
                    <h3 className="text-sm font-medium mb-2">환불 기준</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>기간</TableHead>
                          <TableHead>환불 비율</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>학기 개시일 전일까지</TableCell>
                          <TableCell>전액 환불</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>학기 개시일로부터 30일 이내</TableCell>
                          <TableCell>등록금의 5/6 환불</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>학기 개시일 30일 이후 ~ 60일 이내</TableCell>
                          <TableCell>등록금의 2/3 환불</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>학기 개시일 60일 이후 ~ 90일 이내</TableCell>
                          <TableCell>등록금의 1/2 환불</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>학기 개시일 90일 이후</TableCell>
                          <TableCell>환불 불가</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div className="pt-2">
                    <h3 className="text-sm font-medium mb-2">학기 개시일</h3>
                    <Input type="date" defaultValue="2024-03-02" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline">초기화</Button>
                  <Button>저장</Button>
                </CardFooter>
              </Card>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>환불 통계</CardTitle>
                  <CardDescription>등록금 환불 현황 통계를 확인합니다.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>환불율</span>
                      <span className="text-sm">{((refundedStudents / totalStudents) * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={(refundedStudents / totalStudents) * 100} className="h-2" />
                  </div>

                  <div className="pt-2">
                    <h3 className="text-sm font-medium mb-2">모집단위별 환불 현황</h3>
                    <div className="space-y-4">
                      {DEPARTMENTS.map((dept) => {
                        const deptRefunds = REGISTRATION_DATA.filter(
                          (r) => r.department === dept.name && r.status === "환불완료",
                        ).length
                        const deptTotal = REGISTRATION_DATA.filter((r) => r.department === dept.name).length
                        const refundRate = deptTotal > 0 ? (deptRefunds / deptTotal) * 100 : 0

                        return (
                          <div key={dept.id} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span>{dept.name}</span>
                              <span className="text-sm">{refundRate.toFixed(1)}%</span>
                            </div>
                            <Progress value={refundRate} className="h-2" />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    상세 통계 보기
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
