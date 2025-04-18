"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  ArrowUpDown,
  Database,
  FileText,
  Library,
  MoreHorizontal,
  PenBox,
  Plus,
  Settings,
  Trash2,
  Upload,
  Users,
} from "lucide-react"

// 가상의 데이터
const NOTICE_DATA = [
  { id: 1, title: "2024학년도 입학상담 일정 안내", date: "2024-05-01", status: "published" },
  { id: 2, title: "학생부종합전형 상담 주의사항", date: "2024-04-15", status: "published" },
  { id: 3, title: "면접 대비 방법 안내", date: "2024-04-10", status: "draft" },
  { id: 4, title: "수시모집 자료 업데이트", date: "2024-03-25", status: "published" },
  { id: 5, title: "정시모집 관련 FAQ", date: "2024-03-15", status: "published" },
]

const FAQ_DATA = [
  { id: 1, question: "수시와 정시 지원 횟수는 어떻게 되나요?", date: "2024-05-01", category: "지원자격" },
  { id: 2, question: "검정고시 출신자도 학생부종합전형에 지원 가능한가요?", date: "2024-04-15", category: "지원자격" },
  { id: 3, question: "자기소개서는 어떻게 작성하는 것이 좋을까요?", date: "2024-04-10", category: "서류준비" },
  { id: 4, question: "면접은 어떤 방식으로 진행되나요?", date: "2024-03-25", category: "면접" },
  { id: 5, question: "수능 최저학력기준은 어떻게 되나요?", date: "2024-03-15", category: "전형방법" },
]

const CONSULTANT_DATA = [
  { id: 1, name: "김상담", department: "입학처", role: "관리자", status: "active" },
  { id: 2, name: "이진행", department: "입학처", role: "상담사", status: "active" },
  { id: 3, name: "박도움", department: "입학처", role: "상담사", status: "active" },
  { id: 4, name: "최안내", department: "입학처", role: "상담사", status: "inactive" },
  { id: 5, name: "정전형", department: "입학처", role: "상담사", status: "active" },
]

export default function AdminPage() {
  const [selectedTab, setSelectedTab] = useState("notice")

  return (
    <div className="grid gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">입학상담 관리자</h2>
          <p className="text-muted-foreground">입학상담 시스템의 설정 및 데이터를 관리합니다.</p>
        </div>
      </div>

      <Tabs defaultValue="notice" onValueChange={setSelectedTab}>
        <TabsList className="grid grid-cols-3 w-full max-w-lg">
          <TabsTrigger value="notice">
            <Library className="h-4 w-4 mr-2" />
            게시판 관리
          </TabsTrigger>
          <TabsTrigger value="data">
            <Database className="h-4 w-4 mr-2" />
            데이터 관리
          </TabsTrigger>
          <TabsTrigger value="user">
            <Users className="h-4 w-4 mr-2" />
            사용자 관리
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notice" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Input placeholder="게시물 검색" className="w-[250px]" />
              <Button variant="outline">검색</Button>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />새 게시물
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                  <DialogTitle>새 게시물</DialogTitle>
                  <DialogDescription>새로운 공지사항이나 FAQ를 작성합니다.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">제목</Label>
                    <Input id="title" placeholder="게시물 제목을 입력하세요" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="content">내용</Label>
                    <Textarea id="content" placeholder="게시물 내용을 입력하세요" className="min-h-[200px]" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="type">게시판 유형</Label>
                      <select
                        id="type"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="notice">공지사항</option>
                        <option value="faq">FAQ</option>
                      </select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="status">게시 상태</Label>
                      <select
                        id="status"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="published">게시</option>
                        <option value="draft">임시저장</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="file">첨부파일</Label>
                    <Input id="file" type="file" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">취소</Button>
                  <Button>등록</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Tabs defaultValue="notices" className="w-full">
            <TabsList className="w-full grid grid-cols-2 max-w-[400px]">
              <TabsTrigger value="notices">공지사항</TabsTrigger>
              <TabsTrigger value="faqs">FAQ</TabsTrigger>
            </TabsList>
            <TabsContent value="notices">
              <Card>
                <CardHeader className="py-4">
                  <CardTitle>공지사항 관리</CardTitle>
                  <CardDescription>공지사항을 관리합니다. 수정하거나 삭제할 수 있습니다.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">No</TableHead>
                        <TableHead>제목</TableHead>
                        <TableHead>등록일</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead className="text-right">작업</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {NOTICE_DATA.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.id}</TableCell>
                          <TableCell>{item.title}</TableCell>
                          <TableCell>{item.date}</TableCell>
                          <TableCell>
                            <Badge variant={item.status === "published" ? "default" : "outline"}>
                              {item.status === "published" ? "게시중" : "임시저장"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">메뉴</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <PenBox className="h-4 w-4 mr-2" />
                                  수정
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  삭제
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
                  <Button variant="outline">이전</Button>
                  <div className="text-sm text-muted-foreground">페이지 1 / 3</div>
                  <Button variant="outline">다음</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="faqs">
              <Card>
                <CardHeader className="py-4">
                  <CardTitle>FAQ 관리</CardTitle>
                  <CardDescription>자주 묻는 질문을 관리합니다. 수정하거나 삭제할 수 있습니다.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">No</TableHead>
                        <TableHead>질문</TableHead>
                        <TableHead>카테고리</TableHead>
                        <TableHead>등록일</TableHead>
                        <TableHead className="text-right">작업</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {FAQ_DATA.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.id}</TableCell>
                          <TableCell>{item.question}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{item.category}</Badge>
                          </TableCell>
                          <TableCell>{item.date}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">메뉴</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <PenBox className="h-4 w-4 mr-2" />
                                  수정
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  삭제
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
                  <Button variant="outline">이전</Button>
                  <div className="text-sm text-muted-foreground">페이지 1 / 2</div>
                  <Button variant="outline">다음</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="data" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="h-5 w-5 mr-2" />
                  모집요강 업로드
                </CardTitle>
                <CardDescription>연도별 모집요강 데이터를 업로드합니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="year">학년도</Label>
                  <select
                    id="year"
                    className="flex mt-1 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="2025">2025학년도</option>
                    <option value="2024">2024학년도</option>
                    <option value="2023">2023학년도</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="admission-type">전형유형</Label>
                  <select
                    id="admission-type"
                    className="flex mt-1 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="수시">수시모집</option>
                    <option value="정시">정시모집</option>
                    <option value="편입학">편입학</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="guide-file">모집요강 파일</Label>
                  <Input id="guide-file" type="file" className="mt-1" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">업로드</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  학과정보 관리
                </CardTitle>
                <CardDescription>단과대학 및 학과 정보를 관리합니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="college">단과대학</Label>
                  <select
                    id="college"
                    className="flex mt-1 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">-- 선택 --</option>
                    <option value="인문대학">인문대학</option>
                    <option value="사회과학대학">사회과학대학</option>
                    <option value="자연과학대학">자연과학대학</option>
                    <option value="공과대학">공과대학</option>
                    <option value="경영대학">경영대학</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="department">학과</Label>
                  <select
                    id="department"
                    className="flex mt-1 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">-- 선택하세요 --</option>
                  </select>
                </div>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">
                    학과 관리
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">정보 수정</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  시스템 설정
                </CardTitle>
                <CardDescription>상담 시스템의 기본 설정을 관리합니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="system-name">시스템명</Label>
                  <Input id="system-name" value="입학상담 솔루션" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="academic-year">현재 학년도</Label>
                  <Input id="academic-year" value="2025" className="mt-1" />
                </div>
                <div>
                  <Label className="flex items-center gap-2">
                    <Input type="checkbox" className="w-4 h-4" />
                    상담 예약 기능 활성화
                  </Label>
                </div>
                <div>
                  <Label className="flex items-center gap-2">
                    <Input type="checkbox" className="w-4 h-4" checked />
                    통계 데이터 공개
                  </Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">설정 저장</Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>DB 백업 및 관리</CardTitle>
              <CardDescription>시스템 데이터베이스를 백업하고 관리합니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>백업 파일명</TableHead>
                    <TableHead>생성일시</TableHead>
                    <TableHead>크기</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead className="text-right">작업</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>ACS_DB_20240501.bak</TableCell>
                    <TableCell>2024-05-01 00:00:00</TableCell>
                    <TableCell>2.5 GB</TableCell>
                    <TableCell>
                      <Badge>완료</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        다운로드
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ACS_DB_20240401.bak</TableCell>
                    <TableCell>2024-04-01 00:00:00</TableCell>
                    <TableCell>2.4 GB</TableCell>
                    <TableCell>
                      <Badge>완료</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        다운로드
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ACS_DB_20240301.bak</TableCell>
                    <TableCell>2024-03-01 00:00:00</TableCell>
                    <TableCell>2.3 GB</TableCell>
                    <TableCell>
                      <Badge>완료</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        다운로드
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">이전 백업 보기</Button>
              <Button>새 백업 생성</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="user" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Input placeholder="사용자 검색" className="w-[250px]" />
              <Button variant="outline">검색</Button>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  사용자 추가
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>새 사용자 추가</DialogTitle>
                  <DialogDescription>새로운 상담사 또는 관리자를 추가합니다.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="user-name">이름</Label>
                      <Input id="user-name" placeholder="이름" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="user-id">사용자 ID</Label>
                      <Input id="user-id" placeholder="ID" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="user-department">소속</Label>
                      <Input id="user-department" placeholder="소속" defaultValue="입학처" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="user-role">권한</Label>
                      <select
                        id="user-role"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="admin">관리자</option>
                        <option value="consultant" selected>
                          상담사
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="user-password">비밀번호</Label>
                      <Input id="user-password" type="password" placeholder="비밀번호" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="user-password-confirm">비밀번호 확인</Label>
                      <Input id="user-password-confirm" type="password" placeholder="비밀번호 확인" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="user-email">이메일</Label>
                    <Input id="user-email" type="email" placeholder="이메일" />
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
              <CardTitle>사용자 관리</CardTitle>
              <CardDescription>상담사 및 관리자 계정을 관리합니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">No</TableHead>
                    <TableHead>이름</TableHead>
                    <TableHead>소속</TableHead>
                    <TableHead>권한</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead className="text-right">작업</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {CONSULTANT_DATA.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.department}</TableCell>
                      <TableCell>{item.role}</TableCell>
                      <TableCell>
                        <Badge variant={item.status === "active" ? "default" : "secondary"}>
                          {item.status === "active" ? "활성" : "비활성"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">메뉴</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <PenBox className="h-4 w-4 mr-2" />
                              수정
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Settings className="h-4 w-4 mr-2" />
                              권한 설정
                            </DropdownMenuItem>
                            {item.status === "active" ? (
                              <DropdownMenuItem>
                                <Trash2 className="h-4 w-4 mr-2" />
                                비활성화
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem>
                                <ArrowUpDown className="h-4 w-4 mr-2" />
                                활성화
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">이전</Button>
              <div className="text-sm text-muted-foreground">페이지 1 / 1</div>
              <Button variant="outline">다음</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
