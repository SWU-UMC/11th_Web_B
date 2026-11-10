import React, { useState } from 'react';
import { Search, Pencil, ChevronLeft, ChevronRight, User, Bookmark } from 'lucide-react';
import { useBookmarkStore } from '../stores/bookmark-store';

// --- Types & Mock Data ---
interface Movie {
  id: number;
  title: string;
  releaseDate: string;
  posterUrl: string;
}

interface UserProfile {
  nickname: string;
  email: string;
}

const MOCK_MOVIES: Movie[] = [
  {
    id: 1,
    title: '스파이더맨: 브랜드 뉴 데이',
    releaseDate: '2026.07.29',
    posterUrl: 'https://via.placeholder.com/300x450/1a1a2e/ffffff?text=Spider-Man',
  },
  {
    id: 2,
    title: '오디세이',
    releaseDate: '2026.08.05',
    posterUrl: 'https://via.placeholder.com/300x450/2a1a08/ffffff?text=Odyssey',
  },
  {
    id: 3,
    title: '미니언즈 & 몬스터즈',
    releaseDate: '2026.07.15',
    posterUrl: 'https://via.placeholder.com/300x450/f5ca3c/000000?text=Minions',
  },
  {
    id: 4,
    title: '아바타 3',
    releaseDate: '2025.12.19',
    posterUrl: 'https://via.placeholder.com/300x450/0f4c81/ffffff?text=Avatar+3',
  },
];

const MOCK_USER: UserProfile = {
  nickname: 'gs0428',
  email: 'gwangsoo@cinemalab.kr',
};

export default function MyPage() {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile>(MOCK_USER);
  const [nicknameInput, setNicknameInput] = useState<string>(user.nickname);

  // 외부 파일에서 가져온 Zustand 스토어 활용
  const { bookmarkedMovieIds, toggleBookmark } = useBookmarkStore();

  // 스토어의 bookmarkedMovieIds에 포함된 영화만 필터링
  const bookmarkedMovies = MOCK_MOVIES.filter((movie) =>
    bookmarkedMovieIds.includes(movie.id)
  );

  const handleSave = () => {
    setUser((prev) => ({ ...prev, nickname: nicknameInput }));
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-900 flex flex-col font-sans">
      {/* Header Navbar */}
      <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-10">
          <div className="flex items-center space-x-2 font-black text-xl tracking-tight cursor-pointer">
            <div className="w-6 h-6 bg-black text-white flex items-center justify-center rounded text-xs">
              🎬
            </div>
            <span>UMCine</span>
          </div>

          <nav className="flex space-x-6 text-sm font-medium text-gray-500">
            <a href="#" className="hover:text-black">영화</a>
            <a href="#" className="hover:text-black">검색</a>
            <a href="#" className="text-black font-bold border-b-2 border-black pb-0.5">내 정보</a>
          </nav>
        </div>

        <div className="flex items-center space-x-3">
          <button className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">
            <Search className="w-4 h-4" />
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg">
            로그인
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-8">
        {!isEditing ? (
          /* ================= 1. 내 정보 화면 ================= */
          <section className="space-y-8">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h1 className="text-2xl font-bold text-gray-900">내 정보</h1>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg"
              >
                정보 수정
              </button>
            </div>

            {/* 기본 정보 */}
            <div className="space-y-4">
              <h2 className="text-xs font-semibold text-gray-500">기본 정보</h2>
              <div className="flex items-center space-x-12 py-2">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                  <User className="w-8 h-8" />
                </div>
                <div className="flex space-x-16 text-sm">
                  <div>
                    <span className="block text-xs text-gray-400 mb-1">닉네임</span>
                    <span className="font-bold text-gray-900">{user.nickname}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400 mb-1">이메일</span>
                    <span className="font-bold text-gray-900">{user.email}</span>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* 내 즐겨찾기 (Zustand 스토어 연동) */}
            <div className="space-y-4">
              <h2 className="text-xs font-semibold text-gray-500">내 즐겨찾기</h2>
              {bookmarkedMovies.length > 0 ? (
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {bookmarkedMovies.map((movie) => (
                    <div key={movie.id} className="group relative space-y-2">
                      <div className="aspect-[2/3] rounded-xl overflow-hidden bg-gray-100 shadow-sm relative">
                        <img
                          src={movie.posterUrl}
                          alt={movie.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        {/* 북마크 제거 버튼 */}
                        <button
                          onClick={() => toggleBookmark(movie.id)}
                          className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 rounded-full text-white backdrop-blur-sm"
                          title="즐겨찾기 해제"
                        >
                          <Bookmark className="w-3.5 h-3.5 fill-current text-yellow-400" />
                        </button>
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-gray-900 truncate">{movie.title}</h3>
                        <p className="text-[11px] text-gray-400">{movie.releaseDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-xs text-gray-400">
                  즐겨찾기한 영화가 없습니다.
                </div>
              )}

              {/* 페이지네이션 */}
              <div className="flex justify-center items-center space-x-2 pt-6">
                <button className="p-1 rounded text-gray-300 hover:text-gray-600 disabled:opacity-30" disabled>
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="w-6 h-6 rounded bg-gray-900 text-white text-xs font-medium flex items-center justify-center">
                  1
                </span>
                <button className="p-1 rounded text-gray-300 hover:text-gray-600">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>
        ) : (
          /* ================= 2. 내 정보 수정 화면 ================= */
          <section className="space-y-8">
            <div className="flex items-start justify-between pb-4 border-b border-gray-100">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">내 정보 수정</h1>
                <p className="text-xs text-gray-400 mt-1">닉네임과 프로필 이미지만 변경할 수 있어요.</p>
              </div>
              <button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg"
              >
                변경사항 저장
              </button>
            </div>

            <div className="flex flex-col md:flex-row md:items-start space-y-6 md:space-y-0 md:space-x-16 py-4">
              {/* 프로필 이미지 수정 */}
              <div className="flex flex-col items-center space-y-2">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                    <User className="w-10 h-10" />
                  </div>
                  <button className="absolute bottom-0 right-0 w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow-sm text-gray-700 hover:bg-gray-50">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-xs font-bold text-gray-800">프로필 이미지</span>
                <span className="text-[10px] text-gray-400">선택 사항 · 최대 5MB</span>
              </div>

              {/* 폼 입력창 */}
              <div className="flex-1 space-y-4 max-w-lg">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">닉네임</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={nicknameInput}
                      onChange={(e) => setNicknameInput(e.target.value)}
                      className="w-full text-xs font-medium border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-blue-500 bg-white"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-blue-600 hover:text-blue-700">
                      중복 확인
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">이메일</label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full text-xs font-medium border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* 회원 탈퇴 박스 */}
            <div className="mt-12 p-4 bg-red-50/50 border border-red-200 rounded-xl flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-red-600">회원 탈퇴</h3>
                <p className="text-[11px] text-red-400 mt-0.5">
                  탈퇴하면 작성한 평점, 후기와 즐겨찾기가 모두 삭제되며 복구할 수 없습니다.
                </p>
              </div>
              <button className="bg-white border border-red-300 text-red-500 hover:bg-red-50 text-xs font-semibold px-4 py-2 rounded-lg">
                회원 탈퇴
              </button>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-4 px-8 flex justify-end items-center text-[11px] text-gray-400 space-x-1">
        <span className="w-4 h-3 bg-teal-400 rounded-sm inline-block"></span>
        <span>This product uses the TMDB API but is not endorsed or certified by <a href="#" className="underline">TMDB</a>.</span>
      </footer>
    </div>
  );
}