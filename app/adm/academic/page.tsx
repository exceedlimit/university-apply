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
  BarChart3,
  Building2,
  Download,
  FileText,
  Filter,
  Link,
  Plus,
  Search,
  Settings,
  UserPlus,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"

// 샘플 데이터
const STUDENTS_DATA = [
  {
    id: "2024-0001",
    name: "김지원",
    department: "컴퓨터공학과",
    admissionType: "수시",
    studentId: "2024123456",
    status: "학번부여완료",
    transferStatus: "이관완료",
  },
  {
    id: "2024-0002",
    name: "이수진",
    department: "경영학과",
    admissionType: "수시",
    studentId: "2024123457",
    status: "학번부여완료",
    transferStatus: "이관완료",
  },
  {
    id: "2024-0003",
    name: "박민수",
    department: "전자공학과",
    admissionType: "수시",
    studentId: "2024123458",
    status: "학번부여완료",
    transferStatus: "이관완료",
  },
  {
    id: "2024-0004",
    name: "최영희",
    department: "국어국문학과",
    admissionType: "수시",
    studentId: "2024123459",
    status: "학번부여완료",
    transferStatus: "이관대기",
  },
  {
    id: "2024-0005",
    name: "정현우",
    department: "화학공학과",
    admissionType: "수시",
    studentId: "2024123460",
    status: "학번부여완료",
    transferStatus: "이관대기",
  },
  {
    id: "2024-0006",
    name: "한미영",
    department: "컴퓨터공학과",
    admissionType: "수시",
    studentId: "",
    status: "학번미부여",
    transferStatus: "이관대기",
  },
]

const DEPARTMENTS = [
  { id: 1, name: "컴퓨터공학과", total: 50, assigned: 48, transferred: 45 },
  { id: 2, name: "전자공학과", total: 45, assigned: 45, transferred: 43 },
  { id: 3, name: "경영학과", total: 60, assigned: 58, transferred: 55 },
  { id: 4, name: "국어국문학과", total: 30, assigned: 30, transferred: 28 },
  { id: 5, name: "화학공학과", total: 40, assigned: 39, transferred: 37 },
]

const ACADEMIC_SYSTEMS = [
  { id: 1, name: "학사관리시스템", status: "연결됨", lastSync: "2024-05-20 14:30:22" },
  { id: 2, name: "학적관리시스템", status: "연결됨", lastSync: "2024-05-20 14:30:25" },
  { id: 3, name: "수강신청시스템", status: "연결됨", lastSync: "2024-05-20 14:30:28" },
]

export default function AcademicPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<any>(null)

  // 검색 필터링된 학생 목록
  const filteredStudents = STUDENTS_DATA.filter(
    (student) =>
      student.id.includes(searchTerm) ||
      student.name.includes(searchTerm) ||
      student.department.includes(searchTerm) ||
      (student.studentId && student.studentId.includes(searchTerm)),
  )

  // 통계 계산
  const totalStudents = STUDENTS_DATA.length
  const assignedStudents = STUDENTS_DATA.filter((s) => s.status === "학번부여완료").length
  const transferredStudents = STUDENTS_DATA.filter((s) => s.transferStatus === "이관완료").length
  const assignRate = (assignedStudents / totalStudents) * 100
  const transferRate = (transferredStudents / totalStudents) * 100

  return (
    <div className="space-y-6">
      <Tabs defaultValue="student-id">
        <TabsList className="grid w-full max-w-3xl grid-cols-3">
          <TabsTrigger value="student-id">
            <UserPlus className="h-4 w-4 mr-2" />
            학번 부여
          </TabsTrigger>
          <TabsTrigger value="academic-transfer">
            <Link className="h-4 w-4 mr-2" />
            학사 이관
          </TabsTrigger>
          <TabsTrigger value="academic-report">
            <BarChart3 className="h-4 w-4 mr-2" />
            학사 보고
          </TabsTrigger>
        </TabsList>

        {/* 학번 부여 화면 */}
        <TabsContent value="student-id" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">학번 부여</h2>
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
                  <DropdownMenuItem>학번부여완료</DropdownMenuItem>
                  <DropdownMenuItem>학번미부여</DropdownMenuItem>
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
                <CardTitle className="text-base font-medium">학번부여완료</CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-2xl font-bold text-green-500">{assignedStudents}명</div>
                <div className="text-sm text-muted-foreground">{assignRate.toFixed(1)}%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base font-medium">학번미부여</CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-2xl font-bold text-amber-500">{totalStudents - assignedStudents}명</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base font-medium">학사이관완료</CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-2xl font-bold text-blue-500">{transferredStudents}명</div>
                <div className="text-sm text-muted-foreground">{transferRate.toFixed(1)}%</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>학생 목록</CardTitle>
                      <CardDescription>등록 완료된 학생들의 학번 부여 현황을 확인합니다.</CardDescription>
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      일괄 학번 부여
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <Checkbox />
                        </TableHead>
                        <TableHead>수험번호</TableHead>
                        <TableHead>이름</TableHead>
                        <TableHead>모집단위</TableHead>
                        <TableHead>학번</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead>이관상태</TableHead>
                        <TableHead className="text-right">작업</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell>{student.id}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>{student.department}</TableCell>
                          <TableCell>{student.studentId || "-"}</TableCell>
                          <TableCell>
                            <Badge variant={student.status === "학번부여완료" ? "default" : "outline"}>
                              {student.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={student.transferStatus === "이관완료" ? "secondary" : "outline"}>
                              {student.transferStatus}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedStudent(student)}
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
                  <div className="text-sm text-muted-foreground">총 {filteredStudents.length}명</div>
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
                  <CardTitle>학번 부여 설정</CardTitle>
                  <CardDescription>학번 부여 규칙을 설정합니다.</CardDescription>
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
                    <Label htmlFor="id-format">학번 형식</Label>
                    <Select defaultValue="year-serial">
                      <SelectTrigger id="id-format">
                        <SelectValue placeholder="학번 형식 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="year-serial">입학년도+일련번호</SelectItem>
                        <SelectItem value="year-dept-serial">입학년도+학과코드+일련번호</SelectItem>
                        <SelectItem value="custom">사용자 정의</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="id-example">학번 예시</Label>
                    <Input id="id-example" value="2024123456" readOnly />
                    <p className="text-xs text-muted-foreground">2024(입학년도) + 123456(일련번호)</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="id-start">시작 일련번호</Label>
                    <Input id="id-start" defaultValue="123456" />
                  </div>

                  <div className="pt-2">
                    <h3 className="text-sm font-medium mb-2">학번 부여 방식</h3>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="assign-auto" name="assign-method" className="h-4 w-4" defaultChecked />
                      <Label htmlFor="assign-auto">자동 부여 (모집단위별 연번)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="assign-manual" name="assign-method" className="h-4 w-4" />
                      <Label htmlFor="assign-manual">수동 부여</Label>
                    </div>
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
                      <Badge variant={selectedStudent.status === "학번부여완료" ? "default" : "outline"}>
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
                      <div className="font-medium">학번</div>
                      <div className="font-bold">{selectedStudent.studentId || "-"}</div>
                      <div className="font-medium">이관상태</div>
                      <div>{selectedStudent.transferStatus}</div>
                    </div>

                    {selectedStudent.status === "학번미부여" && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>학번 미부여</AlertTitle>
                        <AlertDescription>아직 학번이 부여되지 않았습니다.</AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" onClick={() => setSelectedStudent(null)}>
                      닫기
                    </Button>
                    <div className="flex gap-2">
                      {selectedStudent.status === "학번미부여" && (
                        <Button size="sm">
                          <UserPlus className="h-4 w-4 mr-2" />
                          학번 부여
                        </Button>
                      )}
                      {selectedStudent.status === "학번부여완료" && selectedStudent.transferStatus === "이관대기" && (
                        <Button size="sm">
                          <Link className="h-4 w-4 mr-2" />
                          학사 이관
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* 학사 이관 화면 */}
        <TabsContent value="academic-transfer" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">학사 이관</h2>
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="이관 상태 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="waiting">이관대기</SelectItem>
                  <SelectItem value="completed">이관완료</SelectItem>
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
                <CardTitle className="text-base font-medium">학번부여완료</CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-2xl font-bold text-green-500">{assignedStudents}명</div>
                <div className="text-sm text-muted-foreground">{assignRate.toFixed(1)}%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base font-medium">이관대기</CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-2xl font-bold text-amber-500">{assignedStudents - transferredStudents}명</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base font-medium">이관완료</CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-2xl font-bold text-blue-500">{transferredStudents}명</div>
                <div className="text-sm text-muted-foreground">{transferRate.toFixed(1)}%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base font-medium">이관률</CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-2xl font-bold">
                  {assignedStudents > 0 ? ((transferredStudents / assignedStudents) * 100).toFixed(1) : "0"}%
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>학사 이관 현황</CardTitle>
                      <CardDescription>학번이 부여된 학생들의 학사 이관 현황을 확인합니다.</CardDescription>
                    </div>
                    <Button>
                      <Link className="h-4 w-4 mr-2" />
                      일괄 이관 처리
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="department">
                    <TabsList className="mb-4">
                      <TabsTrigger value="department">모집단위별</TabsTrigger>
                      <TabsTrigger value="student">학생별</TabsTrigger>
                    </TabsList>

                    <TabsContent value="department">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>모집단위</TableHead>
                            <TableHead>등록인원</TableHead>
                            <TableHead>학번부여</TableHead>
                            <TableHead>이관완료</TableHead>
                            <TableHead>이관률</TableHead>
                            <TableHead className="text-right">작업</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {DEPARTMENTS.map((dept) => (
                            <TableRow key={dept.id}>
                              <TableCell className="font-medium">{dept.name}</TableCell>
                              <TableCell>{dept.total}명</TableCell>
                              <TableCell>{dept.assigned}명</TableCell>
                              <TableCell>{dept.transferred}명</TableCell>
                              <TableCell>
                                {dept.assigned > 0 ? ((dept.transferred / dept.assigned) * 100).toFixed(1) : "0"}%
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

                    <TabsContent value="student">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                          <Input placeholder="학생 검색" className="w-80" />
                          <Button variant="outline" size="icon">
                            <Search className="h-4 w-4" />
                          </Button>
                        </div>
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
                            <TableHead>학번</TableHead>
                            <TableHead>이관상태</TableHead>
                            <TableHead className="text-right">작업</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {STUDENTS_DATA.filter((s) => s.status === "학번부여완료").map((student) => (
                            <TableRow key={student.id}>
                              <TableCell>
                                <Checkbox />
                              </TableCell>
                              <TableCell>{student.id}</TableCell>
                              <TableCell>{student.name}</TableCell>
                              <TableCell>{student.department}</TableCell>
                              <TableCell>{student.studentId}</TableCell>
                              <TableCell>
                                <Badge variant={student.transferStatus === "이관완료" ? "secondary" : "outline"}>
                                  {student.transferStatus}
                                </Badge>
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
                  <CardTitle>학사 시스템 연계 설정</CardTitle>
                  <CardDescription>학사 관련 시스템과의 연계 설정을 관리합니다.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="pt-2">
                    <h3 className="text-sm font-medium mb-2">연계 시스템 상태</h3>
                    <div className="space-y-4">
                      {ACADEMIC_SYSTEMS.map((system) => (
                        <div key={system.id} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            <span>{system.name}</span>
                          </div>
                          <Badge variant={system.status === "연결됨" ? "default" : "destructive"}>
                            {system.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <h3 className="text-sm font-medium mb-2">최근 동기화</h3>
                    <div className="space-y-2">
                      {ACADEMIC_SYSTEMS.map((system) => (
                        <div key={system.id} className="flex justify-between items-center text-sm">
                          <span>{system.name}</span>
                          <span className="text-muted-foreground">{system.lastSync}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <h3 className="text-sm font-medium mb-2">이관 데이터 항목</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="transfer-personal" defaultChecked />
                        <Label htmlFor="transfer-personal">개인정보</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="transfer-academic" defaultChecked />
                        <Label htmlFor="transfer-academic">학적정보</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="transfer-admission" defaultChecked />
                        <Label htmlFor="transfer-admission">입학전형정보</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="transfer-registration" defaultChecked />
                        <Label htmlFor="transfer-registration">등록정보</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="transfer-documents" />
                        <Label htmlFor="transfer-documents">제출서류</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    연계 설정
                  </Button>
                  <Button>
                    <Link className="h-4 w-4 mr-2" />
                    수동 동기화
                  </Button>
                </CardFooter>
              </Card>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>이관 진행 현황</CardTitle>
                  <CardDescription>모집단위별 이관 진행 현황을 확인합니다.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {DEPARTMENTS.map((dept) => {
                    const transferRate = dept.assigned > 0 ? (dept.transferred / dept.assigned) * 100 : 0
                    return (
                      <div key={dept.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{dept.name}</span>
                          <span className="text-sm">{transferRate.toFixed(1)}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={transferRate} className="h-2" />
                          <span className="text-xs text-muted-foreground">
                            {dept.transferred}/{dept.assigned}명
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    이관 현황 다운로드
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* 학사 보고 화면 */}
        <TabsContent value="academic-report" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">학사 보고</h2>
            <div className="flex items-center gap-2">
              <Select defaultValue="2024">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="학년도 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024학년도</SelectItem>
                  <SelectItem value="2023">2023학년도</SelectItem>
                  <SelectItem value="2022">2022학년도</SelectItem>
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
                <CardTitle>학사 통계 보고서</CardTitle>
                <CardDescription>교육부 및 대학 본부 제출용 학사 통계 보고서를 생성합니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="report-type">보고서 유형</Label>
                      <Select defaultValue="admission">
                        <SelectTrigger id="report-type">
                          <SelectValue placeholder="보고서 유형 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admission">신입생 현황</SelectItem>
                          <SelectItem value="registration">등록 현황</SelectItem>
                          <SelectItem value="department">모집단위별 현황</SelectItem>
                          <SelectItem value="region">지역별 현황</SelectItem>
                          <SelectItem value="highschool">출신고교별 현황</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="report-format">보고서 형식</Label>
                      <Select defaultValue="excel">
                        <SelectTrigger id="report-format">
                          <SelectValue placeholder="보고서 형식 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excel">Excel</SelectItem>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="hwp">한글(HWP)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="report-period">기준 기간</Label>
                    <div className="flex gap-2 items-center">
                      <Input id="report-period" type="date" defaultValue="2024-03-01" />
                      <span>~</span>
                      <Input type="date" defaultValue="2024-05-31" />
                    </div>
                  </div>

                  <div className="pt-2">
                    <h3 className="text-sm font-medium mb-2">포함 항목</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="include-summary" defaultChecked />
                        <Label htmlFor="include-summary">요약 정보</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="include-charts" defaultChecked />
                        <Label htmlFor="include-charts">차트 및 그래프</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="include-details" defaultChecked />
                        <Label htmlFor="include-details">상세 데이터</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="include-comparison" defaultChecked />
                        <Label htmlFor="include-comparison">전년도 비교</Label>
                      </div>
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
                  <Download className="h-4 w-4 mr-2" />
                  보고서 생성
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>최근 생성된 보고서</CardTitle>
                <CardDescription>최근에 생성된 학사 보고서 목록입니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>보고서명</TableHead>
                      <TableHead>생성일시</TableHead>
                      <TableHead>형식</TableHead>
                      <TableHead className="text-right">작업</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">2024학년도_신입생_현황_보고서</TableCell>
                      <TableCell>2024-05-20 14:30</TableCell>
                      <TableCell>Excel</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <Download className="h-4 w-4 mr-2" />
                          다운로드
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">2024학년도_등록_현황_보고서</TableCell>
                      <TableCell>2024-05-19 11:15</TableCell>
                      <TableCell>PDF</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <Download className="h-4 w-4 mr-2" />
                          다운로드
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">2024학년도_모집단위별_현황_보고서</TableCell>
                      <TableCell>2024-05-18 16:45</TableCell>
                      <TableCell>Excel</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <Download className="h-4 w-4 mr-2" />
                          다운로드
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">2024학년도_지역별_현황_보고서</TableCell>
                      <TableCell>2024-05-17 09:30</TableCell>
                      <TableCell>PDF</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <Download className="h-4 w-4 mr-2" />
                          다운로드
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">2024학년도_출신고교별_현황_보고서</TableCell>
                      <TableCell>2024-05-16 13:20</TableCell>
                      <TableCell>Excel</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <Download className="h-4 w-4 mr-2" />
                          다운로드
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>학사 통계 대시보드</CardTitle>
              <CardDescription>주요 학사 통계 지표를 시각화하여 보여줍니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-sm font-medium mb-4">모집단위별 등록 현황</h3>
                  <div className="space-y-4">
                    {DEPARTMENTS.map((dept) => (
                      <div key={dept.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span>{dept.name}</span>
                          <span className="text-sm">{dept.total}명</span>
                        </div>
                        <Progress value={(dept.total / 60) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-4">전형유형별 등록 현황</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>수시모집</span>
                        <span className="text-sm">150명 (67%)</span>
                      </div>
                      <Progress value={67} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>정시모집</span>
                        <span className="text-sm">70명 (31%)</span>
                      </div>
                      <Progress value={31} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>편입학</span>
                        <span className="text-sm">5명 (2%)</span>
                      </div>
                      <Progress value={2} className="h-2" />
                    </div>
                  </div>

                  <h3 className="text-sm font-medium mb-4 mt-8">지역별 등록 현황</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>서울/경기</span>
                        <span className="text-sm">120명 (53%)</span>
                      </div>
                      <Progress value={53} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>부산/경남</span>
                        <span className="text-sm">45명 (20%)</span>
                      </div>
                      <Progress value={20} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>대구/경북</span>
                        <span className="text-sm">30명 (13%)</span>
                      </div>
                      <Progress value={13} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>기타 지역</span>
                        <span className="text-sm">30명 (13%)</span>
                      </div>
                      <Progress value={13} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                상세 통계 보기
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                대시보드 다운로드
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
